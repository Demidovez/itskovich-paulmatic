import { useEffect, useState } from "react";
import { MdExpandMore, MdMail, MdOutlineNoteAdd, MdAdd } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";
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
      id: new Date().getTime(),
      type: "linkedin",
      step: 0,
      day: moment().startOf("day").add(0, "days"),
      level: "",
      name: "Написать сообщение",
      description: "Сообщение в LinkedIn профиль",
      isNoReply: false,
      delay: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    },
    {
      id: new Date().getTime(),
      type: "mail",
      step: 1,
      day: moment().startOf("day").add(1, "days"),
      level: "",
      name: "Отправить письмо",
      description: "Простой просмотр LinkedIn профиля",
      isNoReply: false,
      delay: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    },
    {
      id: new Date().getTime(),
      type: "linkedin",
      step: 2,
      day: moment().startOf("day").add(2, "days"),
      level: "",
      name: "Просмотр профиля",
      description: "Простой просмотр LinkedIn профиля",
      isNoReply: false,
      delay: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    },
    {
      id: new Date().getTime(),
      type: "linkedin",
      step: 3,
      day: moment().startOf("day").add(3, "days"),
      level: "",
      name: "Просмотр профиля",
      description: "Простой просмотр LinkedIn профиля",
      isNoReply: false,
      delay: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    },
  ]);

  const addStep = () => {
    onChange();
    const lastStep = steps.length
      ? steps[steps.length - 1]
      : {
          day: moment().startOf("day"),
          step: 0,
          delay: {
            days: 0,
            hours: 0,
            minutes: 0,
          },
        };

    setSteps([
      ...steps,
      {
        id: new Date().getTime(),
        type: "linkedin",
        step: lastStep.step + 1,
        day: Object.values(lastStep.delay).some((val) => val > 0)
          ? moment(lastStep.day)
              .add(lastStep.delay.days, "days")
              .add(lastStep.delay.hours, "hours")
              .add(lastStep.delay.minutes, "minutes")
          : moment(lastStep.day).add(1, "days"),
        level: "",
        name: "Просмотр профиля",
        description: "Простой просмотр LinkedIn профиля",
        isNoReply: false,
        delay: {
          days: 0,
          hours: 0,
          minutes: 0,
        },
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
    const editedSteps = steps.map((step) =>
      step.id === editedStep.id ? editedStep : step
    );

    let currentDay = editedSteps[0].day;

    const updatedSteps = editedSteps.map((step, i) => {
      if (i === 0) return step;

      currentDay = Object.values(step.delay).some((val) => val > 0)
        ? moment(currentDay)
            .add(step.delay.days, "days")
            .add(step.delay.hours, "hours")
            .add(step.delay.minutes, "minutes")
        : moment(currentDay).add(1, "days");

      return {
        ...step,
        day: currentDay,
      };
    });

    setSteps(updatedSteps);
  };

  return (
    <div className="sequence-page-steps-component modal-body d-flex flex-column overflow-hidden p-0">
      <div className="add-step">
        <div onClick={addStep}>
          <MdAdd size="1.6rem" />
        </div>
      </div>
      <div className="overflow-hidden h-100 dragcontext">
        {steps.length > 0 ? (
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
                              dayOfStart={steps[0].day}
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
        ) : (
          "Добавить шаг"
        )}
      </div>
    </div>
  );
};

export default SequencePageSteps;
