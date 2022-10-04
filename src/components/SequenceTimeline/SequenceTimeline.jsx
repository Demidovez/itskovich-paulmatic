import "./SequenceTimeline.scss";
import { AiOutlineDelete } from "react-icons/ai";
import GridLayout, { WidthProvider } from "react-grid-layout";
import { useState } from "react";

const ReactGridLayout = WidthProvider(GridLayout);

const fixLayout = (layout) => {
  // `y` is calculated by `h` in the layout object, since `h` is 20
  // first row will be 0, second 20, third 40
  const maxY = 0;

  // when an item goes to a new row, there is an empty column in the maxY row
  // so here we find which columns exist
  // tslint:disable-next-line:max-line-length
  const maxRowXs = layout
    .map((item) => (item.y === maxY ? item.x : null))
    .filter((value) => value !== null);

  // xs or cols, we only have 3 cols
  const xs = Array(24)
    .fill()
    .map((_, i) => i);

  // find the missing col
  // tslint:disable-next-line:max-line-length
  const missingX = xs.find((value) =>
    maxRowXs.every((maxRowX) => maxRowX !== value)
  );

  // bring the item from the new row into maxY row
  // and place it in the missing column
  const fixedLayout = layout.map((item) => {
    if (item.y > maxY) {
      return {
        ...item,
        y: maxY,
        x: missingX,
      };
    }
    return item;
  });

  return fixedLayout;
};

const SequenceTimeline = ({ jobs = [], onRemoveJob, setJobs }) => {
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 2, h: 1 },
    { i: "b", x: 2, y: 0, w: 2, h: 1 },
    { i: "c", x: 4, y: 0, w: 2, h: 1 },
    { i: "d", x: 6, y: 0, w: 2, h: 1 },
  ]);

  const [compactType, setCompactType] = useState("vertical");

  return (
    <div className="sequence-timeline-component">
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={24}
        rowHeight={50}
        // compactType={"vertical"}
        compactType={compactType}
        // verticalCompact={false}
        // compactType="vertical"
        // onLayoutChange={(e) => setLayout(fixLayout(e))}
        // maxRows={1}
        // onDrag={(layout) => setLayout(layout)}
        onDragStart={() => setCompactType("horizontal")}
        onDragStop={() => setCompactType("vertical")}
        isBounded={true}
        // compactType={null}
        // verticalCompact={false}
        // preventCollision={true}
        margin={[0, 0]}
        style={{ position: "relative" }}
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
      </ReactGridLayout>
    </div>
  );
};

export default SequenceTimeline;