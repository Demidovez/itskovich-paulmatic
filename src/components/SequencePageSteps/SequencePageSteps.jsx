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

const SequencePageSteps = ({ isShow, onChange, initSteps = [] }) => {
  const dispatch = useDispatch();
  const [dataForModalEditor, setDataForModalEditor] = useState({});

  const [steps, setSteps] = useState(
    initSteps.map((step, index) => ({ ...step, step: index }))
  );

  useEffect(() => {
    dispatch(
      saveStepsSequence(
        steps.map((step) => ({
          id: step.id,
          step: step.step,
          Action: step.Action,
          Delay: step.Delay,
          DueTime: moment(step.DueTime || "0001-01-01")
            .add(step.Delay, "second")
            .format(),
          Body: step.Body,
          Subject: step.Subject,
          Type: step.Type,
          Name: step.Name,
          Description: step.Description,
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
    if (step.id) {
      setSteps((steps) =>
        steps.map((oldStep) => (oldStep.id === step.id ? step : oldStep))
      );
    } else {
      setSteps([
        ...steps,
        {
          ...step,
          id: step.id ?? new Date().getTime(),
          step: steps.length,
          Delay: 86400,
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

  const callback = (callback, ...args) => {
    callback(...args);
    onChange();
  };

  return (
    <>
      {isShow ? (
        <div className="sequence-page-steps-component modal-body d-flex flex-column overflow-auto p-0">
          <>
            <div className="add-step">
              {steps.length ? (
                <div onClick={() => callback(addStep)}>
                  <MdAdd size="1.6rem" />
                </div>
              ) : null}
            </div>
            <div className="h-100 dragcontext">
              {steps.length > 0 ? (
                <DragDropContext
                  onDragEnd={(...args) => callback(onDragEnd, ...args)}
                >
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
                                    onChange={(...args) =>
                                      callback(updateStep, ...args)
                                    }
                                    onDelete={() => callback(onDelete, step.id)}
                                    openModal={() =>
                                      setDataForModalEditor({
                                        mode: "edit",
                                        stepId: step.id,
                                      })
                                    }
                                    delay={step.Delay}
                                    delayByFirstDay={steps
                                      .slice(0, index + 1)
                                      .reduce(
                                        (acc, step) => (acc += step.Delay),
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
                  <Button
                    color="primary"
                    outline
                    type="button"
                    onClick={() => callback(addStep)}
                  >
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
                onSubmit={(step) => callback(createOrUpdateStep, step)}
              />
            )}
          </>
        </div>
      ) : null}
    </>
  );
};

export default SequencePageSteps;
