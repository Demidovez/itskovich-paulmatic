import { AiOutlineDelete } from "react-icons/ai";
import ReactGrid, { WidthProvider } from "react-grid-layout";
import React, { Fragment, useEffect, useState } from "react";
// import "/node_modules/react-grid-layout/css/styles.css";
// import "/node_modules/react-resizable/css/styles.css";
import "./SequenceTimeline.scss";
import Moveable from "react-moveable";

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
  const [layout, setLayout] = useState([
    { i: "a", label: "00:00 - 04:00", x: 0, y: 0, w: 4, h: 1, static: false },
    // { i: "b", label: "07:00 - 11:00", x: 7, y: 0, w: 4, h: 1, static: false },
    // { i: "c", label: "18:00 - 22:00", x: 18, y: 0, w: 4, h: 1, static: false },
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

  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  return (
    <div
      className="sequence-timeline-component"
      style={{ position: "relative" }}
    >
      {layout.map((item) => (
        <Fragment key={item.i}>
          <div
            className="target timeline-item"
            // style={{ width: 150, height: 50 }}
          >
            <span className="item-label">{item.label}</span>
            <span className="remove-icon">
              <AiOutlineDelete />
            </span>
          </div>
          <Moveable
            target={document.querySelector(".target")}
            resizable={true}
            keepRatio={false}
            throttleResize={1}
            renderDirections={["w", "e"]}
            edge={true}
            origin={true}
            onResizeStart={(e) => {
              e.setOrigin(["%", "%"]);
              e.dragStart && e.dragStart.set(frame.translate);
            }}
            onResize={(e) => {
              const beforeTranslate = e.drag.beforeTranslate;

              frame.translate = beforeTranslate;
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
              e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            }}
          />
        </Fragment>
      ))}
      {/* <ReactGridLayout
        className="layout"
        layout={layout}
        cols={24}
        rowHeight={50}
        onResize={(l) => correctJobs(l)}
        onDrag={(l) => correctJobs(l)}
        isBounded={true}
        margin={[2, 0]}
        style={{ position: "relative" }}
        // resizeHandles={["w", "e"]}
        // resizeHandle={<ResizeHandler />}
        preventCollision={true}
      >
        {layout.map((item) => (
          <Fragment key={item.i}>
            <div
              className="target timeline-item"
              style={{ width: 150, height: 50 }}
            >
              <span className="item-label">{item.label}</span>
              <span className="remove-icon">
                <AiOutlineDelete />
              </span>
            </div>
            <Moveable
              target={document.querySelector(".target")}
              resizable={true}
              keepRatio={false}
              throttleResize={1}
              renderDirections={["w", "e"]}
              edge={true}
              origin={true}
              onResizeStart={(e) => {
                e.setOrigin(["%", "%"]);
                e.dragStart && e.dragStart.set(frame.translate);
              }}
              onResize={(e) => {
                const beforeTranslate = e.drag.beforeTranslate;

                frame.translate = beforeTranslate;
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
              }}
            />
          </Fragment>
        ))}
      </ReactGridLayout> */}
    </div>
  );
};

export default SequenceTimeline;
