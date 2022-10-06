import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Moveable from "react-moveable";

const SequenceTimelineItem = ({ item, containerWidth, onResize }) => {
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
        style={{ width: item.w * (900 / 24) }}
      >
        <span className="item-label">{item.label}</span>
        <span className="remove-icon">
          <AiOutlineDelete />
        </span>
      </div>
      <Moveable
        target={target}
        resizable={true}
        draggable={false}
        className="moveable"
        renderDirections={null}
        edge={true}
        origin={false}
        pinchable={false}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;

          e.target.style.width = `${e.width}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, 0)`;
          onResize(e.width, e);
        }}
        onResizeEnd={(e) => {
          e.target.style.width = `${item.w * (900 / 24)}px`;
        }}
      />
    </>
  );
};
export default SequenceTimelineItem;
