import "./SequenceTimeline.scss";
import { AiOutlineDelete } from "react-icons/ai";
import GridLayout, { WidthProvider } from "react-grid-layout";
import React, { useEffect, useRef, useState } from "react";
import SequenceTimelineItem from "components/SequenceTimelineItem/SequenceTimelineItem";

const ReactGridLayout = WidthProvider(GridLayout);

const SequenceTimeline = ({ jobs = [], onRemoveJob, setJobs }) => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([...Array(48).fill()]);
  const [layout, setLayout] = useState([
    {
      i: "a",
      label: "00:00 - 04:00",
      x: 0,
      y: 0,
      w: 8,
      h: 1,
    },
    {
      i: "b",
      label: "07:00 - 11:00",
      x: 14,
      y: 0,
      w: 8,
      h: 1,
    },
    {
      i: "c",
      label: "18:00 - 22:00",
      x: 32,
      y: 0,
      w: 8,
      h: 1,
    },
  ]);

  // useEffect(() => {
  //   setLayout(jobs.map(job => ({i:})))
  // }, [jobs]);

  const correctJobs = (layout) => {
    const correctedLayout = layout.map((job) => ({
      ...job,
      label: `${job.x < 10 ? "0" + job.x : job.x}:00 - ${
        job.x + job.w < 10 ? "0" + (job.x + job.w) : job.x + job.w
      }:00`,
    }));

    setLayout(correctedLayout);
  };

  return (
    <div className="sequence-timeline-component" ref={containerRef}>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={48}
        rowHeight={50}
        isResizable={false}
        // isDraggable={false}
        onDrag={(l) => correctJobs(l)}
        isBounded={true}
        margin={[0, 0]}
        style={{ position: "relative" }}
        preventCollision={true}
      >
        {/* {lines.map((_, i) => (
          <div key={i} className="line"></div>
        ))} */}
        {layout.map((item) => (
          <div key={item.i}>
            <SequenceTimelineItem
              item={item}
              container={containerRef}
              onResize={(width, translate) => {
                correctJobs(
                  layout.map((l) =>
                    l.i === item.i
                      ? { ...l, w: Math.round(width / (900 / 48)) }
                      : l
                  )
                );
                console.log(width, Math.round(width / (900 / 48)));
              }}
            />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default SequenceTimeline;
