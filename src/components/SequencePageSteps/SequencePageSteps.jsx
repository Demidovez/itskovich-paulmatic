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
import { updatedSteps } from "store/slices/sequenceMasterSlice";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SequencePageSteps = ({ isShow, steps = [] }) => {
  const dispatch = useDispatch();
  const [dataForModalEditor, setDataForModalEditor] = useState({});

  const addStep = () => {
    setDataForModalEditor({
      mode: "create",
    });
  };

  const createOrUpdateStep = (step) => {
    let newSteps = [];
    if (step.id) {
      newSteps = steps.map((oldStep) =>
        oldStep.id === step.id ? step : oldStep
      );
    } else {
      newSteps = [
        ...steps,
        {
          ...step,
          id: step.id ?? new Date().getTime(),
          step: steps.length,
          Delay: 86400,
        },
      ];
    }

    dispatch(updatedSteps(newSteps));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(steps, result.source.index, result.destination.index);

    const newSteps = items.map((item, i) => ({ ...item, step: i }));

    dispatch(updatedSteps(newSteps));
  };

  const updateStep = (editedStep) => {
    const editedSteps = steps.map((step) =>
      step.id === editedStep.id ? editedStep : step
    );

    dispatch(updatedSteps(editedSteps));
  };

  const onDelete = (id) => {
    dispatch(updatedSteps(steps.filter((step) => step.id !== id)));
  };

  const callback = (callback, ...args) => {
    callback(...args);
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
