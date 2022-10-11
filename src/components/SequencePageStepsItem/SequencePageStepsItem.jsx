import { useEffect, useState } from "react";
import {
  MdExpandMore,
  MdMail,
  MdOutlineNoteAdd,
  MdOutlineDragIndicator,
} from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit3, FiPlusSquare } from "react-icons/fi";
import { Tooltip } from "reactstrap";
import SequencePageStepsModalDelay from "components/SequencePageStepsModalDelay/SequencePageStepsModalDelay";
import moment from "moment";
import TaskEditorModal from "components/TaskEditorModal/TaskEditorModal";

const SequencePageStepsItem = ({ step, onChange, delay }) => {
  const [isShowModalEditor, setIsShowModalEditor] = useState(false);
  const [isShowModalDelay, setIsShowModalDelay] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const onDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsShowModalEditor(true);
    }
  };

  return (
    <div className="d-flex sequence-step">
      <div className="d-flex flex-column pl-0 pr-3 align-items-center">
        <div className="mb-2">
          {step.type === "linkedin" ? (
            <BsLinkedin color="#037794" size="1.5rem" />
          ) : null}
          {step.type === "carbage" ? <RiDeleteBin5Line size="1.5rem" /> : null}
          {step.type === "mail" ? <MdMail color="brown" size="1.5rem" /> : null}
        </div>
        <div className="flex-fill vertical-line" />
      </div>
      <div className="w-100 pb-4">
        <span className="step-label">
          Шаг {step.step + 1} - День{" "}
          {moment()
            .startOf("day")
            .add(delay, "seconds")
            .diff(moment().startOf("day"), "days") + 1}
          {step.step > 0 ? (
            <MdExpandMore
              size="1.5rem"
              className="mt--1"
              onClick={() => setIsShowModalDelay(true)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MdExpandMore
              size="1.5rem"
              className="mt--1"
              style={{ opacity: 0 }}
            />
          )}
          <MdOutlineDragIndicator
            size="1.5rem"
            className="ml-3 mt--1"
            id={`tooltip_${step.id}`}
          />
          <Tooltip
            isOpen={tooltipOpen}
            target={`tooltip_${step.id}`}
            toggle={toggleTooltip}
            placement="right"
          >
            Перетащить
          </Tooltip>
        </span>
        <div
          className="row sequence-desc  ml-0 mr-0 mt-2 mb-2"
          onClick={onDoubleClick}
        >
          <div className="col col-4 d-flex">
            <div style={{ width: 50 }}>{step.level}</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{step.name}</div>
          </div>
          <div
            className="col col-7 description"
            style={{ opacity: 0.7, fontSize: 14 }}
          >
            {step.description}
          </div>
          <div className="col col-1 sequence-desc-controls d-flex">
            <FiEdit3
              size="1.2rem"
              className="mr-2"
              onClick={() => setIsShowModalEditor(true)}
            />
            <FiPlusSquare size="1.2rem" />
          </div>
        </div>
      </div>
      <SequencePageStepsModalDelay
        isShow={isShowModalDelay}
        onClose={() => setIsShowModalDelay(false)}
        onSubmit={(delay) => onChange({ ...step, delay })}
        value={step.delay}
      />
      <TaskEditorModal
        task={step}
        isShow={isShowModalEditor}
        onClose={() => setIsShowModalEditor(false)}
      />
    </div>
  );
};

export default SequencePageStepsItem;
