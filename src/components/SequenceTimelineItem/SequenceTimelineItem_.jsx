import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Moveable from "react-moveable";

const SequenceTimelineItem = ({ item, containerWidth }) => {
  const [borders, setBorders] = useState([]);
  const [directionResize, setDirectionResize] = useState("");
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(document.querySelector(`.timeline-item.item-${item.id}`));
  }, [item.id]);

  return (
    <>
      <div
        className={`timeline-item item-${item.id}`}
        style={{ width: item.width }}
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
        elementGuidelines={[".timeline-item"]}
        onSnap={(e) => {
          // e.target.style.transform = `translate(0px, 0)`;
        }}
        onDragStart={(e) => {
          e.target.style.zIndex = 1000;
        }}
        onDragEnd={(e) => {
          e.target.style.zIndex = "initial";
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;

          e.target.style.width = `${e.width}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, 0)`;
        }}
        onDrag={({ target, beforeTranslate }) => {
          const positionX = Math.max(
            Math.min(beforeTranslate[0], containerWidth - item.width),
            0
          );

          target.style.transform = `translate(${positionX}px, 0)`;
        }}
      />
    </>
  );
};

export default SequenceTimelineItem;
