import { AiOutlineDelete } from "react-icons/ai";
import ReactGrid, { WidthProvider } from "react-grid-layout";
import React, { Fragment, useEffect, useRef, useState } from "react";
// import "/node_modules/react-grid-layout/css/styles.css";
// import "/node_modules/react-resizable/css/styles.css";
import "./SequenceTimeline.scss";
import Moveable from "react-moveable";
import SequenceTimelineItem from "components/SequenceTimelineItem/SequenceTimelineItem";

const ReactGridLayout = WidthProvider(ReactGrid);

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
  const containerRef = useRef(null);
  const [layout, setLayout] = useState([
    // { i: "a", label: "00:00 - 04:00", x: 0, y: 0, w: 4, h: 1, static: false },
    // { i: "b", label: "07:00 - 11:00", x: 7, y: 0, w: 4, h: 1, static: false },
    // { i: "c", label: "18:00 - 22:00", x: 18, y: 0, w: 4, h: 1, static: false },
  ]);

  useEffect(() => {
    setLayout(
      jobs.map((job) => ({
        ...job,
        label: "00:00 - 04:00",
      }))
    );
  }, [jobs.length]);

  const correctJobs = (layout) => {
    const correctedLayout = layout.map((job) => ({
      ...job,
      label: `${job.x < 10 ? "0" + job.x : job.x}:00 - ${
        job.x + job.w < 10 ? "0" + (job.x + job.w) : job.x + job.w
      }:00`,
    }));

    setLayout(correctedLayout);
  };

  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  return (
    <div className="sequence-timeline-component" ref={containerRef}>
      {layout.map((item) => (
        <SequenceTimelineItem
          key={item.id}
          item={item}
          containerWidth={containerRef.current.offsetWidth}
        />
      ))}
    </div>
  );
};

export default SequenceTimeline;
