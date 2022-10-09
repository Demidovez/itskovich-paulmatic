import { useEffect, useState } from "react";
import { MdExpandMore, MdMail, MdOutlineNoteAdd, MdAdd } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit3, FiPlusSquare } from "react-icons/fi";
import "./SequencePageSteps.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SequencePageStepsItem from "components/SequencePageStepsItem/SequencePageStepsItem";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SequencePageSteps = ({ onChange }) => {
  const [steps, setSteps] = useState([
    {
      id: 0,
      type: "linkedin",
      step: 0,
      day: 0,
      level: "",
      name: "Просмотр профиля",
      description: "Простой просмотр LinkedIn профиля",
      isNoReply: false,
      isVariants: false,
      delay: 0,
    },
    {
      id: 1,
      type: "carbage",
      step: 1,
      day: 0,
      level: "A",
      name: "{{Sender.Company}}<>{{Company}}",
      description:
        "Привет {{FirstName}}, я обратился к тебе потому что заметил та твоем профиле кое-что",
      isNoReply: false,
      isVariants: true,
      delay: 0,
    },
    {
      id: 2,
      type: "mail",
      step: 2,
      day: 4,
      level: "A",
      name: "",
      description:
        "Привет {{FirstName}}, причина почему {{Company}} в моем поле зрения это что {{Sender.Company}}",
      isNoReply: true,
      isVariants: true,
      delay: 0,
    },
  ]);

  const addStep = () => {
    onChange();
    setSteps([
      ...steps,
      {
        id: steps.length,
        type: "linkedin",
        step: steps.length,
        day: steps[steps.length - 1].day + steps[steps.length - 1].delay,
        level: "",
        name: "Просмотр профиля",
        description: "Простой просмотр LinkedIn профиля",
        isNoReply: false,
        isVariants: false,
        delay: 0,
      },
    ]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(steps, result.source.index, result.destination.index);

    setSteps(items.map((item, i) => ({ ...item, step: i })));
  };

  const updateStep = (editedStep) => {
    setSteps(
      steps.map((step) => (step.id === updateStep.id ? editedStep : step))
    );
  };

  return (
    <div className="sequence-page-steps-component modal-body d-flex flex-column overflow-hidden p-0">
      <div className="add-step">
        <div onClick={addStep}>
          <MdAdd size="1.6rem" />
        </div>
      </div>
      <div className="overflow-hidden h-100 dragcontext">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} className="h-100">
                <div className="overflow-auto h-100 pl-3 pr-3">
                  {steps.map((step, index) => (
                    <Draggable
                      key={step.id}
                      draggableId={"" + step.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                          className={`pt-2 pl-2 pr-2 pb-2 draggable-step ${
                            snapshot.isDragging ? "dragging" : ""
                          }`}
                        >
                          <SequencePageStepsItem
                            step={step}
                            onChange={updateStep}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default SequencePageSteps;
