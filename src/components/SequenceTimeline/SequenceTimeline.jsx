import "./SequenceTimeline.scss";
import React, { useEffect, useRef, useState } from "react";
import SequenceTimelineItem from "components/SequenceTimelineItem/SequenceTimelineItem";

const SequenceTimeline = ({ jobs, onRemoveJob, setJobs, onFullTimeline }) => {
  const containerRef = useRef(null);
  const [dirtyAreas, setDirtyAreas] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    // Находим новый item в массиве, которого еще нет в лайауте
    const newJob = jobs.find((job) => !layout.some((l) => l.id === job.id));

    if (newJob) {
      setLayout((unSortedlayout) => {
        // Сортируем лайаут по возрастанию, так как items могли переместиться
        const layout = [...unSortedlayout].sort((a, b) => a.x - b.x);

        // Находим пустые зоны для потенциального размещения нового item
        let emptyAreas = layout.map((item, index) => {
          return [
            item.x + item.w,
            // Если проверяемы айтом последний, то края пустой зоны будет краем все таймлайна
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
          // Находим удобные зоны, начиная от 8х пунктов, TODO: поправить
          const foundedEmptyArea =
            emptyAreas.find((area) => area[1] - area[0] >= 8) ||
            emptyAreas.find((area) => area[1] - area[0] >= 7) ||
            emptyAreas.find((area) => area[1] - area[0] >= 6) ||
            emptyAreas.find((area) => area[1] - area[0] >= 5) ||
            emptyAreas.find((area) => area[1] - area[0] >= 4) ||
            emptyAreas.find((area) => area[1] - area[0] >= 3) ||
            emptyAreas.find((area) => area[1] - area[0] >= 2) ||
            emptyAreas.find((area) => area[1] - area[0] >= 1);

          // Определяем начальную позицию и ее длину, для будущего размещения
          const [x, w] = [
            foundedEmptyArea[0],
            foundedEmptyArea[1] - foundedEmptyArea[0] >= 8
              ? 8
              : foundedEmptyArea[1] - foundedEmptyArea[0],
          ];

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
  }, [jobs.length]);

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
