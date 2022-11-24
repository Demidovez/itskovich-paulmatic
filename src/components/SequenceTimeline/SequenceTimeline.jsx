import "./SequenceTimeline.scss";
import React, { useEffect, useRef, useState } from "react";
import SequenceTimelineItem from "components/SequenceTimelineItem/SequenceTimelineItem";

const SequenceTimeline = ({
  jobs,
  onRemoveJob,
  setJobs,
  onFullTimeline,
  disabled,
}) => {
  const containerRef = useRef(null);
  const [dirtyAreas, setDirtyAreas] = useState([]);
  const [layout, setLayout] = useState(jobs);

  useEffect(() => {
    // Находим новый item в массиве, которого еще нет в лайауте
    const newJob = jobs.find((job) => !layout.some((l) => l.id === job.id));

    if (newJob) {
      console.log(newJob);
      setLayout((unSortedlayout) => {
        // Сортируем лайаут по возрастанию, так как items могли переместиться
        const layout = [...unSortedlayout].sort((a, b) => a.x - b.x);

        // Находим пустые зоны для потенциального размещения нового item
        let emptyAreas = layout.map((item, index) => {
          return [
            item.x + item.w,
            // Если проверяемый айтом последний, то края пустой зоны будет краем все таймлайна
            index + 1 === layout.length ? 48 : layout[index + 1].x,
          ];
        });

        // Проверка айтома была по правую сторону. Отдельно нужно проверить левую сторону первого пункта, если она вообще есть
        if (layout[0] && layout[0].x !== 0) {
          emptyAreas = [[0, layout[0].x], ...emptyAreas];
        } else if (layout.length === 0) {
          // Если айтомов вообще нету, то по факту у нас одна большая пустая зона, ограниченная размерами таймлайна
          emptyAreas = [[0, 48]];
        }

        // Если айтомы стоят вплотную друг к другу, то пустая зона между ними имеет размеры, например, [12,12]. Туда мы ничего не вставим. Такие зоны отфильтровываем
        emptyAreas = emptyAreas.filter((area) => area[0] !== area[1]);

        // Если пустых зон нету, то и лайоут мы не может увеличить
        if (emptyAreas.length === 0) {
          return layout;
        } else {
          const recommendPositions = [
            ...Array(48 - 32)
              .fill()
              .map((_, i) => 32 + i),
            ...Array(32)
              .fill()
              .map((_, i) => 31 - i),
          ];

          let foundedEmptyArea;
          let x;
          let w;

          for (let i = 6; i > 0 && !foundedEmptyArea; i--) {
            const isFoundPosition = recommendPositions.some((goodX) => {
              foundedEmptyArea = emptyAreas.find(
                (area) =>
                  goodX >= area[0] &&
                  goodX + i <= area[1] &&
                  area[1] - area[0] >= i
              );

              if (foundedEmptyArea) {
                x = goodX;
                w = i;
              }

              return !!foundedEmptyArea;
            });

            if (isFoundPosition) {
              break;
            }
          }

          return [
            ...layout,
            {
              ...newJob,
              x,
              w,
            },
          ];
        }
      });
    } else {
      setLayout((layout) => {
        if (layout.length > jobs.length) {
          const ids = jobs.map(({ id }) => id);

          return layout.filter((l) => ids.includes(l.id));
        } else {
          return layout;
        }
      });
    }
  }, [JSON.stringify(jobs)]);

  useEffect(() => {
    const areas = layout.map((item) => [item.x, item.x + item.w]);

    setDirtyAreas(areas);

    setJobs(layout);

    const isFull =
      areas.reduce((acc, area) => (acc += area[1] - area[0]), 0) === 48;

    onFullTimeline(isFull);
  }, [JSON.stringify(layout)]);

  return (
    <div
      className="sequence-timeline-component"
      ref={containerRef}
      style={{ width: 900 }}
    >
      {layout.map((item) => (
        <SequenceTimelineItem
          disabled={disabled}
          item={item}
          key={item.id}
          container={containerRef}
          dirtyAreas={dirtyAreas}
          onRemoveJob={onRemoveJob}
          onResize={(w, x) => {
            setLayout(
              layout.map((l) => {
                if (l.id === item.id) {
                  return { ...l, w, x };
                } else {
                  return l;
                }
              })
            );
          }}
        />
      ))}
    </div>
  );
};

export default SequenceTimeline;
