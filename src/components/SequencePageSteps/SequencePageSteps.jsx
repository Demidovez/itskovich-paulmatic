import { useEffect, useState } from "react";
import { MdExpandMore, MdMail, MdOutlineNoteAdd, MdAdd } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";
import "./SequencePageSteps.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SequencePageStepsItem from "components/SequencePageStepsItem/SequencePageStepsItem";
import { useDispatch } from "react-redux";
import { saveStepsSequence } from "store/slices/sequenceMasterSlice";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SequencePageSteps = ({ onChange }) => {
  const dispatch = useDispatch();

  const [steps, setSteps] = useState([
    {
      id: new Date().getTime(),
      type: "linkedin",
      step: 0,
      level: "",
      name: "Написать сообщение",
      description: "Сообщение в LinkedIn профиль",
      body: "<body>Привет, {{.Contact.Name}}!</body>",
      subject: "Наконец-то достучались до тебя, {{.Contact.Name}}!</body>",
      isNoReply: false,
      delay: 86400,
    },
    {
      id: new Date().getTime() + 1,
      type: "mail",
      step: 1,
      level: "",
      name: "Отправить письмо",
      description: "Простой просмотр LinkedIn профиля",
      body: "<body>Hi, {{.Contact.Name}}!</body>",
      subject:
        "Здравствуйте, наконец-то достучались до тебя, {{.Contact.Name}}!</body>",
      isNoReply: false,
      delay: 86400,
    },
    {
      id: new Date().getTime() + 2,
      type: "linkedin",
      step: 2,
      level: "",
      name: "Просмотр профиля",
      description: "Простой просмотр LinkedIn профиля",
      body: "<body>Aloha, {{.Contact.Name}}!</body>",
      subject:
        "Добрый день, наконец-то достучались до тебя, {{.Contact.Name}}!</body>",
      isNoReply: false,
      delay: 86400,
    },
    {
      id: new Date().getTime() + 3,
      type: "linkedin",
      step: 3,
      level: "",
      name: "Просмотр профиля",
      description: "Простой просмотр LinkedIn профиля",
      body: "<body>Приветствую, {{.Contact.Name}}!</body>",
      subject:
        "Доброе утро, наконец-то достучались до тебя, {{.Contact.Name}}!</body>",
      isNoReply: false,
      delay: 86400,
    },
  ]);

  useEffect(() => {
    dispatch(
      saveStepsSequence(
        steps.map((step) => ({
          Delay: step.delay,
          Body: step.body,
          Subject: step.subject,
        }))
      )
    );
  }, [JSON.stringify(steps)]);

  const addStep = () => {
    onChange();

    setSteps([
      ...steps,
      {
        id: new Date().getTime(),
        type: "linkedin",
        step: steps.length,
        level: "",
        name: "Просмотр профиля",
        description: "Простой просмотр LinkedIn профиля",
        body: "<body>Привет, {{.Contact.Name}}!</body>",
        subject:
          "Доброе время суток, наконец-то достучались до тебя, {{.Contact.Name}}!</body>",
        isNoReply: false,
        delay: 86400,
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

    setSteps(editedSteps);
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
                              delay={steps
                                .slice(1, index + 1)
                                .reduce((acc, step) => (acc += step.delay), 0)}
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
