import "./SequenceTimeline.scss";
import { AiOutlineDelete } from "react-icons/ai";
import GridLayout from "react-grid-layout";
import { useState } from "react";

const SequenceTimeline = ({ jobs = [], onRemoveJob, setJobs }) => {
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 2, h: 1 },
    { i: "b", x: 2, y: 0, w: 2, h: 1 },
    { i: "c", x: 4, y: 0, w: 2, h: 1 },
    { i: "d", x: 6, y: 0, w: 2, h: 1 },
  ]);

  return (
    <div className="sequence-timeline-component">
      <GridLayout
        className="layout"
        layout={layout}
        cols={24}
        rowHeight={50}
        width={900}
        // compactType="vertical"
        // onLayoutChange={(e) => setLayout(fixLayout(e))}
        // maxRows={1}
        margin={[0, 0]}
        isResizable={true}
      >
        <div key="a" className="timeline-item">
          <span className="item-label">a</span>
          <span className="remove-icon">
            <AiOutlineDelete />
          </span>
        </div>
        <div key="b" className="timeline-item">
          <span className="item-label">b</span>
          <span className="remove-icon">
            <AiOutlineDelete />
          </span>
        </div>
        <div key="c" className="timeline-item">
          <span className="item-label">c</span>
          <span className="remove-icon">
            <AiOutlineDelete />
          </span>
        </div>
        <div key="d" className="timeline-item">
          <span className="item-label">d</span>
          <span className="remove-icon">
            <AiOutlineDelete />
          </span>
        </div>
      </GridLayout>
    </div>
  );
};

export default SequenceTimeline;
