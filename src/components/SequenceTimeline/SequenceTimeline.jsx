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
    { i: "a", x: 0, y: 0, w: 2, h: 1, static: false },
    { i: "b", x: 2, y: 0, w: 2, h: 1, static: false },
    { i: "c", x: 4, y: 0, w: 2, h: 1, static: false },
    { i: "d", x: 6, y: 0, w: 2, h: 1, static: false },
  ]);

  // useEffect(() => {
  //   setLayout(jobs.map(job => ({i:})))
  // }, [jobs]);

  return (
    <div className="sequence-timeline-component">
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={24}
        rowHeight={50}
        onDragStop={(l) => setLayout(l)}
        onResizeStop={(l) => setLayout(l)}
        isBounded={true}
        margin={[2, 0]}
        style={{ position: "relative" }}
        resizeHandles={["w", "e"]}
        resizeHandle={<ResizeHandler />}
        preventCollision={true}
      >
        {layout.map((item) => (
          <div key={item.i} className="timeline-item">
            <span className="item-label">{item.i}</span>
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
