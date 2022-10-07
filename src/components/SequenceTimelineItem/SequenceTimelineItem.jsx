import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import "./SequenceTimelineItem.scss";

const SequenceTimelineItem = ({ item, container, onResize }) => {
  const [borders, setBorders] = useState([]);
  const [directionResize, setDirectionResize] = useState("");
  const [target, setTarget] = useState();

  const elementRef = useRef(null);

  useEffect(() => {
    setTarget(document.querySelector(`.timeline-item.item-${item.i}`));
  }, [item.id]);

  return (
    // <div className="sequence-timeline-item-component">
    <>
      {/* {lines.map((_, i) => (
        <div key={i} className="line"></div>
      ))} */}
      <div
        className={`timeline-item item-${item.i}`}
        style={{ width: item.w * (900 / 48) }}
        ref={elementRef}
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
        snappable={true}
        snapThreshold={900 / 48}
        verticalGuidelines={[
          ...Array(96)
            .fill()
            .map((_, i) => (-48 + i) * (900 / 48)),
        ]}
        useResizeObserver={true}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;

          const { x: parentX, width: parentWidth } =
            container.current.getBoundingClientRect();
          const { x: elemX, width: elemWidth } =
            e.target.getBoundingClientRect();

          if (
            elemX >= parentX + 900 / 48 &&
            elemX + elemWidth <= parentX + parentWidth - 900 / 48
          ) {
            e.target.style.width = `${e.width}px`;
            e.target.style.transform = `translate(${beforeTranslate[0]}px, 0)`;
          }
        }}
        onResizeEnd={(e) => {
          // onResize(e.lastEvent.width, e);
        }}
      />
    </>
  );
};

export default SequenceTimelineItem;
