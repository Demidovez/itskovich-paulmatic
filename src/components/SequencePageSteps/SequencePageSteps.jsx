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
import { Button } from "reactstrap";
import TaskEditorModal from "components/TaskEditorModal/TaskEditorModal";
import ModalYouSure from "components/ModalYouSure/ModalYouSure";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SequencePageSteps = ({ isShow, onChange }) => {
  const dispatch = useDispatch();
  const [dataForModalEditor, setDataForModalEditor] = useState({});

  const [steps, setSteps] = useState([
    {
      id: new Date().getTime(),
      Type: "linkedin",
      step: 0,
      Name: "Написать сообщение",
      Description: "Сообщение в LinkedIn профиль",
      Body: "<body>Привет, {{.Contact.Name}}!</body>",
      Subject: "Наконец-то достучались до тебя, {{.Contact.Name}}!",
      delay: 86400,
    },
    {
      id: new Date().getTime() + 1,
      Type: "manual_email",
      step: 1,
      Name: "Отправить письмо",
      Description: "Простой просмотр LinkedIn профиля",
      Body: "<body>Hi, {{.Contact.Name}}!</body>",
      Subject:
        "Здравствуйте, наконец-то достучались до тебя, {{.Contact.Name}}!",
      delay: 86400,
    },
    {
      id: new Date().getTime() + 2,
      Type: "linkedin",
      step: 2,
      Name: "Просмотр профиля",
      Description: "Простой просмотр LinkedIn профиля",
      Body: "<body>Aloha, {{.Contact.Name}}!</body>",
      Subject:
        "Добрый день, наконец-то достучались до тебя, {{.Contact.Name}}!",
      delay: 86400,
    },
    {
      id: new Date().getTime() + 3,
      Type: "linkedin",
      step: 3,
      Name: "Просмотр профиля",
      Description: "Простой просмотр LinkedIn профиля",
      Body: "<body>Приветствую, {{.Contact.Name}}!</body>",
      Subject:
        "Доброе утро, наконец-то достучались до тебя, {{.Contact.Name}}!",
      delay: 86400,
    },
  ]);

  useEffect(() => {
    dispatch(
      saveStepsSequence(
        steps.map((step) => ({
          Delay: step.delay,
          Body: step.Body,
          Subject: step.Subject,
          Type: step.Type,
        }))
      )
    );
  }, [JSON.stringify(steps)]);

  const addStep = () => {
    setDataForModalEditor({
      mode: "create",
    });
  };

  const createOrUpdateStep = (step) => {
    onChange();

    if (step.id) {
      setSteps((steps) =>
        steps.map((oldStep) => (oldStep.id === step.id ? step : oldStep))
      );
    } else {
      setSteps([
        ...steps,
        {
          ...step,
          id: new Date().getTime(),
          step: steps.length,
          description: "Простой просмотр LinkedIn профиля",
          delay: 86400,
        },
      ]);
    }
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

  const onDelete = (id) => {
    setSteps((steps) => steps.filter((step) => step.id !== id));
  };

  return (
    <>
      {isShow ? (
        <div className="sequence-page-steps-component modal-body d-flex flex-column overflow-auto p-0">
          <div className="add-step">
            {steps.length ? (
              <div onClick={addStep}>
                <MdAdd size="1.6rem" />
              </div>
            ) : null}
          </div>
          <div className="h-100 dragcontext">
            {steps.length > 0 ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div ref={provided.innerRef} className="">
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
                                  onDelete={() => onDelete(step.id)}
                                  openModal={() =>
                                    setDataForModalEditor({
                                      mode: "edit",
                                      stepId: step.id,
                                    })
                                  }
                                  delay={steps
                                    .slice(1, index + 1)
                                    .reduce(
                                      (acc, step) => (acc += step.delay),
                                      0
                                    )}
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
              <div className="d-flex flex-column align-items-center pt-7">
                <p>Здесь Вы можете создать шаги последовательности</p>
                <Button color="primary" outline type="button" onClick={addStep}>
                  Создать шаг
                </Button>
              </div>
            )}
          </div>
          {dataForModalEditor.mode && (
            <TaskEditorModal
              task={
                steps.find((step) => step.id === dataForModalEditor.stepId) ||
                {}
              }
              mode={dataForModalEditor.mode}
              onClose={() => setDataForModalEditor({})}
              onSubmit={(step) => createOrUpdateStep(step)}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default SequencePageSteps;
