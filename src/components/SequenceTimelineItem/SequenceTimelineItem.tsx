import React, { useEffect, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Moveable from 'react-moveable';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';

import IconClose from '~src/assets/img/icons/common/close.svg';
import SequencePageScheduleModalTime from '~src/components/SequencePageScheduleModalTime/SequencePageScheduleModalTime';
import { generateTimeLabel } from '~src/utils/utils';

const STEP = 900 / 48;

const SequenceTimelineItem = ({
  item,
  container,
  onResize,
  dirtyAreas,
  onRemoveJob,
  disabled,
}) => {
  const [ isShowModalTime, setIsShowModalTime ] = useState(false);
  const [ isDraging, setIsDraging ] = useState(false);
  const [ size, setSize ] = useState({ w: item.w, x: item.x });
  const [ bounds, setBounds ] = useState({
    position: 'css',
    left: 0,
    right: 0,
  });
  const [ target, setTarget ] = useState();

  useEffect(() => {
    setTarget(document.querySelector(`.timeline-item.item-${item.id}`));
  }, [item.id]);

  useEffect(() => {
    let left = 0;
    let right = 0;

    const sortedDirtyAreas = [...dirtyAreas].sort((a, b) => a[0] - b[0]);

    sortedDirtyAreas.forEach((area, index) => {
      if (JSON.stringify(area) === JSON.stringify([ item.x, item.x + item.w ])) {
        left = index ? sortedDirtyAreas[index - 1][1] * STEP : 0;
        right =
          index === sortedDirtyAreas.length - 1
            ? 0
            : (48 - sortedDirtyAreas[index + 1][0]) * STEP;

        setBounds((prev) => ({ ...prev, left, right }));
      }
    });

    setSize({ w: item.w, x: item.x });
  }, [ JSON.stringify(dirtyAreas), item.x, item.w ]);

  const onDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsShowModalTime(true);
    }
  };

  return (
    <>
      <div
        className={`timeline-item item-${item.id} ${
          isDraging ? 'dragging' : ''
        } d-flex justify-content-center ${size.w <= 7 ? 'small-size' : ''}`}
        style={{
          width: item.w * STEP,
          minWidth: STEP,
          transform: `translate(${item.x * STEP}px, 0)`,
        }}
        id={`popover_${item.id}`}
        onClick={onDoubleClick}
      >
        {size.w <= 4 ? (
          <MdMoreHoriz size="2rem" />
        ) : (
          <>
            <span className={`item-label ${size.w <= 5 ? 'short' : ''}`}>
              {size.w <= 5
                ? generateTimeLabel(
                  size.x * 30,
                  (size.x + size.w) * 30,
                ).replace(' - ', ' ')
                : generateTimeLabel(size.x * 30, (size.x + size.w) * 30)}
            </span>
            <span
              className="remove-icon"
              onClick={() => !disabled && onRemoveJob(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <IconClose style={{ height: 15, width: 15 }} fill="white" />
            </span>
          </>
        )}
      </div>
      <Moveable
        target={target}
        resizable={!disabled}
        draggable={!disabled}
        className="moveable"
        renderDirections={null}
        edge={true}
        origin={false}
        pinchable={false}
        snappable={true}
        snapThreshold={STEP}
        snapContainer={container.current}
        bounds={isDraging ? { ...bounds, left: 0, right: 0 } : bounds}
        verticalGuidelines={[
          ...Array(48)
            .fill()
            .map((_, i) => i * STEP),
        ]}
        useResizeObserver={true}
        onDragStart={(e) => {
          e.target.style.transform = `translate(${size.x * STEP}px, 0)`;
          setIsDraging(true);
        }}
        onDrag={(e) => {
          e.target.style.transform = `translate(${e.beforeTranslate[0]}px, 0)`;

          const currentX = Math.round(e.beforeTranslate[0] / STEP);
          const currentW = size.w;

          const isCrossing = dirtyAreas.some((area) => {
            if (
              JSON.stringify(area) === JSON.stringify([ item.x, item.x + item.w ])
            )
              return false;

            return (
              (currentX >= area[0] && currentX < area[1]) ||
              (currentX + currentW > area[0] &&
                currentX + currentW <= area[1]) ||
              (area[0] >= currentX &&
                area[0] <= currentX + currentW &&
                area[1] >= currentX &&
                area[1] <= currentX + currentW)
            );
          });

          if (!isCrossing) {
            setSize((prev) => ({
              ...prev,
              x: currentX,
            }));
          }
        }}
        onDragEnd={(e) => {
          onResize(size.w, size.x);
          e.target.style.transform = `translate(${size.x * STEP}px, 0)`;
          setIsDraging(false);
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;

          e.target.style.width = `${e.width}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, 0)`;

          setSize({
            w: Math.round(e.width / STEP),
            x: Math.round(beforeTranslate[0] / STEP),
          });
        }}
        onResizeEnd={(e) => {
          onResize(size.w, size.x);
        }}
      />
      {size.w <= 4 && !isDraging && (
        <UncontrolledPopover
          // delay={100}
          trigger="hover"
          placement="top"
          fade
          target={`popover_${item.id}`}
          className="popover-timeline"
        >
          <PopoverBody>
            <div className="d-flex align-items-center">
              <span className="item-label">
                {generateTimeLabel(size.x * 30, (size.x + size.w) * 30)}
              </span>
              <span
                className="remove-icon ml-2"
                style={{ marginTop: -3, cursor: 'pointer' }}
                onClick={() => onRemoveJob(item.id)}
              >
                <IconClose style={{ height: 15, width: 15 }} fill="red" />
              </span>
            </div>
          </PopoverBody>
        </UncontrolledPopover>
      )}
      <SequencePageScheduleModalTime
        isShow={isShowModalTime}
        onClose={() => setIsShowModalTime(false)}
        onSubmit={(size) => setSize(size)}
        value={{
          start: size.x,
          end: size.x + size.w,
        }}
      />
    </>
  );
};

export default SequenceTimelineItem;
