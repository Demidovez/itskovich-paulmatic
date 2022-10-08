import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import "./SequenceTimelineItem.scss";

const STEP = 900 / 48;

const SequenceTimelineItem = ({ item, container, onResize, dirtyAreas }) => {
  const [isDraging, setIsDraging] = useState(false);
  const [size, setSize] = useState({ w: item.w, x: item.x });
  const [bounds, setBounds] = useState({
    position: "css",
    left: 0,
    right: 0,
  });
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(document.querySelector(`.timeline-item.item-${item.id}`));
  }, [item.id]);

  useEffect(() => {
    let left = 0;
    let right = 0;

    const sortedDirtyAreas = [...dirtyAreas].sort((a, b) => a[0] - b[0]);

    sortedDirtyAreas.forEach((area, index) => {
      if (JSON.stringify(area) === JSON.stringify([item.x, item.x + item.w])) {
        left = index ? sortedDirtyAreas[index - 1][1] * STEP : 0;
        right =
          index === sortedDirtyAreas.length - 1
            ? 0
            : (48 - sortedDirtyAreas[index + 1][0]) * STEP;

        setBounds((prev) => ({ ...prev, left, right }));
      }
    });

    setSize({ w: item.w, x: item.x });
  }, [JSON.stringify(dirtyAreas), item.x, item.w]);

  return (
    <>
      <div
        className={`timeline-item item-${item.id} ${
          isDraging ? "dragging" : ""
        }`}
        style={{
          width: item.w * STEP,
          transform: `translate(${item.x * STEP}px, 0)`,
        }}
      >
        <span className="item-label">{item.label}</span>
        <span className="remove-icon">
          <AiOutlineDelete />
        </span>
      </div>
      <Moveable
        target={target}
        resizable={true}
        draggable={true}
        className="moveable"
        renderDirections={null}
        edge={true}
        origin={false}
        pinchable={false}
        snappable={true}
        snapThreshold={STEP}
        snapContainer={container.current}
        bounds={isDraging ? { ...bounds, left: 0, right: 0 } : bounds}
        verticalGuidelines={[
          ...Array(48)
            .fill()
            .map((_, i) => i * STEP),
        ]}
        useResizeObserver={true}
        onDragStart={(e) => {
          e.target.style.transform = `translate(${size.x * STEP}px, 0)`;
          setIsDraging(true);
        }}
        onDrag={(e) => {
          e.target.style.transform = `translate(${e.beforeTranslate[0]}px, 0)`;

          const currentX = Math.round(e.beforeTranslate[0] / STEP);
          const currentW = size.w;

          const isCrossing = dirtyAreas.some((area) => {
            if (
              JSON.stringify(area) === JSON.stringify([item.x, item.x + item.w])
            )
              return false;

            return (
              (currentX >= area[0] && currentX < area[1]) ||
              (currentX + currentW > area[0] &&
                currentX + currentW <= area[1]) ||
              (area[0] >= currentX &&
                area[0] <= currentX + currentW &&
                area[1] >= currentX &&
                area[1] <= currentX + currentW)
            );
          });

          if (!isCrossing) {
            setSize((prev) => ({
              ...prev,
              x: currentX,
            }));
          }
        }}
        onDragEnd={(e) => {
          onResize(size.w, size.x);
          e.target.style.transform = `translate(${size.x * STEP}px, 0)`;
          setIsDraging(false);
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;

          e.target.style.width = `${e.width}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, 0)`;

          setSize({
            w: Math.round(e.width / STEP),
            x: Math.round(beforeTranslate[0] / STEP),
          });
        }}
        onResizeEnd={(e) => {
          onResize(size.w, size.x);
        }}
      />
    </>
  );
};

export default SequenceTimelineItem;
