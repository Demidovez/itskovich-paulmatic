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
import ModalYouSure from "components/ModalYouSure/ModalYouSure";
import TypeIcon from "components/TypeIcon/TypeIcon";

const SequencePageStepsItem = ({
  step,
  onChange,
  delay,
  openModal,
  onDelete,
}) => {
  const [isShowModalDelay, setIsShowModalDelay] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const [isAskSure, setIsAskSure] = useState(false);

  const onDoubleClick = (e) => {
    if (e.detail === 2) {
      openModal();
    }
  };

  return (
    <div className="d-flex sequence-step">
      <div className="d-flex flex-column pl-0 pr-3 align-items-center">
        <div className="sequence-icons">
          <TypeIcon
            type={step.Type}
            size="1.5rem"
            className="type-icon"
            inverse={true}
          />
          <div className="delete-icon" onClick={() => setIsAskSure(true)}>
            <RiDeleteBin5Line size="1.5rem" color="#d30101" />
          </div>
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
          className="sequence-desc ml-0 mr-0 mt-2 mb-2 d-flex"
          onClick={onDoubleClick}
        >
          <div className="d-flex" style={{ width: 450 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }} className="subject">
              {step.Subject || step.Name}
            </div>
          </div>
          <div
            className="pl-4"
            style={{ opacity: 0.7, fontSize: 14, width: 100, flex: 1 }}
          >
            <div className="description">{step.Body || step.Description}</div>
          </div>
          <div className="col1 col1-1 sequence-desc-controls d-flex">
            <FiEdit3
              size="1.2rem"
              className="mr-2"
              onClick={() => openModal()}
            />
            {/* <FiPlusSquare size="1.2rem" /> */}
          </div>
        </div>
      </div>
      <SequencePageStepsModalDelay
        isShow={isShowModalDelay}
        onClose={() => setIsShowModalDelay(false)}
        onSubmit={(delay) => onChange({ ...step, delay })}
        value={step.delay}
      />
      <ModalYouSure
        isShow={isAskSure}
        title={"Удалить шаг последовательности"}
        text={"Вы действительно хотите удалить этот шаг?"}
        onAgree={onDelete}
        onCancel={() => {
          setIsAskSure(false);
        }}
      />
    </div>
  );
};

export default SequencePageStepsItem;
