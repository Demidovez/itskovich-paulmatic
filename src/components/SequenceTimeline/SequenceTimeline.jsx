import "./SequenceTimeline.scss";
import { AiOutlineDelete } from "react-icons/ai";
import GridLayout, { WidthProvider } from "react-grid-layout";
import React, { useEffect, useState } from "react";

const ReactGridLayout = WidthProvider(GridLayout);

const ResizeHandler = React.forwardRef(({ handleAxis, ...restProps }, ref) => {
  return (
    <div
      className={`react-resizable-handle react-resizable-handle-${handleAxis} sequence-resizer-${handleAxis}`}
      ref={ref}
      {...restProps}
    ></div>
  );
});

const SequenceTimeline = ({ jobs = [], onRemoveJob, setJobs }) => {
  const [layout, setLayout] = useState([
    { i: "a", label: "00:00 - 04:00", x: 0, y: 0, w: 4, h: 1, static: false },
    { i: "b", label: "07:00 - 11:00", x: 7, y: 0, w: 4, h: 1, static: false },
    { i: "c", label: "18:00 - 22:00", x: 18, y: 0, w: 4, h: 1, static: false },
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
    <div className="sequence-timeline-component">
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={24}
        rowHeight={50}
        onDrag={(l) => correctJobs(l)}
        onResize={(l) => correctJobs(l)}
        isBounded={true}
        margin={[2, 0]}
        style={{ position: "relative" }}
        resizeHandles={["w", "e"]}
        resizeHandle={<ResizeHandler />}
        preventCollision={true}
      >
        {layout.map((item) => (
          <div key={item.i} className="timeline-item">
            <span className="item-label">{item.label}</span>
            <span className="remove-icon">
              <AiOutlineDelete />
            </span>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default SequenceTimeline;
