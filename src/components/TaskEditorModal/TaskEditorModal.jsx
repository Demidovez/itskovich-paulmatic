import { Button, Input, Modal } from "reactstrap";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useRef, useState } from "react";
import { usePrompt } from "hooks/usePrompt";
import { useSelector } from "react-redux";

import "./TaskEditorModal.scss";
import TaskTypes from "components/TaskTypes/TaskTypes";
import DropdownWithIcon from "components/DropdownWithIcon/DropdownWithIcon";
import { BiCodeCurly } from "react-icons/bi";
import { TbTemplate } from "react-icons/tb";
import PreviewViewer from "components/PreviewViewer/PreviewViewer";
import DropdownIcon from "components/DropdownIcon/DropdownIcon";

const TaskEditorModal = ({ onClose, task, mode = "create", onSubmit }) => {
  const [currentTask, setCurrentTask] = useState(task);
  const [isHasCC, setIsHasCC] = useState(false);
  const [isHasBCC, setIsHasBCC] = useState(false);
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [variablesList, setVariablesList] = useState([]);
  const [tamplatesList, setTamplatesList] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState("");
  const [selectedVariable, setSelectedVariable] = useState("");
  const [selectedSubjectVariable, setSelectedSubjectVariable] = useState("");

  const subjectRef = useRef(null);
  const bodyTextareaRef = useRef(null);

  usePrompt(isChanged);

  const handleClose = () => {
    if (isChanged) {
      const answer = window.confirm("Вы уверены, что хотите закрыть?");

      if (answer) {
        setIsChanged(false);
        onClose();
      } else {
        //some code
      }
    } else {
      onClose();
    }
  };

  const dirtyTypes = useSelector((state) => state.common.Tasks.Types);
  useEffect(() => {
    setTypes([...Object.values(dirtyTypes)].sort((a, b) => a.Order - b.Order));
  }, [JSON.stringify(dirtyTypes)]);

  const { Variables, StubContact } = useSelector(
    (state) => state.common.Templates.Compiler
  );
  const templates = useSelector((state) => state.common.Templates.Marketplace);
  const Account = useSelector((state) => state.common.Account);

  useEffect(() => {
    if (types.length) {
      setCurrentType(types[0]);
    }
  }, [types.length]);

  useEffect(() => {
    setVariablesList(
      Variables.map((variable) => ({
        name: variable.Name,
        label: `${variable.Name} - ${variable.Description}`,
      }))
    );
  }, [Variables.length]);

  useEffect(() => {
    templates &&
      setTamplatesList(
        Object.entries(templates).map((template) => ({
          name: template[0],
          body: template[1],
        }))
      );
  }, [templates]);

  useEffect(() => {
    currentType &&
      setCurrentTask((task) => ({
        ...task,
        Type: currentType.Creds.Name,
        Name: currentType.Actions[0].Title,
      }));
  }, [JSON.stringify(currentType)]);

  const toggleType = (type) => {
    setCurrentType(type);
    setCurrentTask({
      ...currentTask,
      Subject: "",
      Body: "",
    });
    setSelectedVariable("");
    setSelectedSubjectVariable("");
  };

  useEffect(() => {
    if (selectedSubjectVariable && subjectRef.current) {
      const cursorPosition = subjectRef.current.selectionStart;
      const textBeforeCursorPosition = subjectRef.current.value.substring(
        0,
        cursorPosition
      );
      const textAfterCursorPosition = subjectRef.current.value.substring(
        cursorPosition,
        subjectRef.current.value.length
      );
      subjectRef.current.value = `${textBeforeCursorPosition}{{${selectedSubjectVariable}}}${textAfterCursorPosition}`;

      subjectRef.current.focus();
      subjectRef.current.selectionStart =
        cursorPosition + selectedSubjectVariable.length + 4;
      subjectRef.current.selectionEnd =
        cursorPosition + selectedSubjectVariable.length + 4;

      setCurrentTask((currentTask) => ({
        ...currentTask,
        Subject: subjectRef.current.value,
      }));
      setSelectedSubjectVariable("");
    }
  }, [selectedSubjectVariable, subjectRef.current]);

  useEffect(() => {
    if (
      currentType &&
      currentType.Creds.Name !== "manual_email" &&
      selectedVariable &&
      bodyTextareaRef.current
    ) {
      const cursorPosition = bodyTextareaRef.current.selectionStart;
      const textBeforeCursorPosition = bodyTextareaRef.current.value.substring(
        0,
        cursorPosition
      );
      const textAfterCursorPosition = bodyTextareaRef.current.value.substring(
        cursorPosition,
        bodyTextareaRef.current.value.length
      );
      bodyTextareaRef.current.value = `${textBeforeCursorPosition}{{${selectedVariable}}}${textAfterCursorPosition}`;

      bodyTextareaRef.current.focus();
      bodyTextareaRef.current.selectionStart =
        cursorPosition + selectedVariable.length + 4;
      bodyTextareaRef.current.selectionEnd =
        cursorPosition + selectedVariable.length + 4;

      setCurrentTask((currentTask) => ({
        ...currentTask,
        Body: bodyTextareaRef.current.value,
      }));
      setSelectedVariable("");
    }
  }, [selectedVariable, bodyTextareaRef.current, currentType]);

  // console.log(currentTask);

  return (
    <>
      <Modal
        className="modal-dialog-centered mt-0 mb-0 flex-column task-editor-modal-component"
        contentClassName="h-100 flex-fill"
        isOpen={true}
        toggle={() => handleClose()}
        style={{
          maxWidth: "1400px",
          width: "90%",
          minWidth: "200px",
          minHeight: "100%",
          padding: "2.5rem 0",
        }}
      >
        <div className="modal-header text-center pb-2">
          <div className="w-100">
            <h4 className="modal-title w-100 pb-2 d-flex">
              {mode === "create" ? "Создание задачи" : "Изменение задачи"}
            </h4>
          </div>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => handleClose()}
            style={{ position: "absolute", right: "1.25rem" }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body d-flex flex-column pt-2 ">
          <div className="row flex-fill">
            <div className="col col-7 d-flex flex-column">
              <TaskTypes
                types={types}
                current={currentType}
                setCurrent={toggleType}
              />
              <h3 className="mt-3 mb-3">
                {currentType
                  ? currentType.Actions[0].Title
                  : "Тип задачи не выбран!"}
              </h3>
              <div className="task-editor-wrapper flex-fill d-flex flex-column">
                {["manual_email", "linkedin"].includes(
                  currentType && currentType.Creds.Name
                ) && (
                  <div className="editor-label editor-subject">
                    <span>Тема</span>
                    <Input
                      innerRef={subjectRef}
                      type="text"
                      placeholder="Тема письма..."
                      className="editor-subject-input"
                      value={currentTask.Subject || ""}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          Subject: e.target.value,
                        })
                      }
                    />
                    <div>
                      {/* <span style={{ fontSize: 16 }}>{"{ }"}</span> */}
                      <DropdownIcon
                        items={variablesList}
                        onSelect={(variable) =>
                          setSelectedSubjectVariable(variable.name)
                        }
                      />
                      {currentType &&
                        currentType.Creds.Name === "manual_email" && (
                          <>
                            <span onClick={() => setIsHasCC(!isHasCC)}>CC</span>
                            <span onClick={() => setIsHasBCC(!isHasBCC)}>
                              BCC
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                )}

                {isHasCC && (
                  <div className="editor-label">
                    <span>СС</span>
                    <Input
                      type="text"
                      placeholder="Добавить в копию..."
                      className="editor-subject-input"
                    />
                  </div>
                )}
                {isHasBCC && (
                  <div className="editor-label">
                    <span>BСС</span>
                    <Input
                      type="text"
                      placeholder="Добавить в скрытую копию..."
                      className="editor-subject-input"
                    />
                  </div>
                )}
                <div className="task-editor flex-fill d-flex flex-column pl-0 pr-0 pb-0">
                  <div className="mb-0 mt-1 pl-3" style={{ zIndex: 100 }}>
                    {currentType &&
                      currentType.Creds.Name === "manual_email" && (
                        <DropdownWithIcon
                          label="Шаблон"
                          icon={() => <TbTemplate size="1.1rem" />}
                          size="sm"
                          className="editor-btn mr-2"
                          items={tamplatesList.map((template) => template.name)}
                          onSelect={(name) =>
                            setActiveTemplate(templates[name])
                          }
                        />
                      )}
                    <DropdownWithIcon
                      label="Переменные"
                      icon={() => <BiCodeCurly size="1.1rem" />}
                      className="editor-btn"
                      size="sm"
                      items={variablesList}
                      onSelect={(variable) =>
                        setSelectedVariable(variable.name)
                      }
                    />
                  </div>
                  <div className="flex-fill">
                    {currentType &&
                    currentType.Creds.Name === "manual_email" ? (
                      <EditorEmail
                        content={activeTemplate}
                        style="body {margin: 0px; padding: 0 10px}"
                        onChange={(Body) =>
                          setCurrentTask((task) => ({ ...task, Body }))
                        }
                        insertedVariable={selectedVariable}
                        placeholder="Введите тело письма..."
                        toolbar="undo redo bold italic alignleft aligncenter alignright alignjustify bullist numlist fontsize forecolor backcolor | blocks fontfamily removeformat "
                      />
                    ) : (
                      <Input
                        innerRef={bodyTextareaRef}
                        type="textarea"
                        placeholder="Сообщение..."
                        className="pl-3 h-100 border-0 task-editor-textarea"
                        onChange={(e) =>
                          setCurrentTask((task) => ({
                            ...task,
                            Body: e.target.value,
                          }))
                        }
                        value={currentTask.Body || ""}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-5">
              <div className="task-preview h-100 p-0">
                <div className="task-preview-label">предпросмотр</div>
                <div className="h-100">
                  <PreviewViewer
                    body={currentTask.Body}
                    stubContact={StubContact}
                    account={Account}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer pt-0">
          <Button
            color="danger"
            outline
            data-dismiss="modal"
            type="button"
            onClick={() => handleClose()}
          >
            Отмена
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              onSubmit(currentTask);
              handleClose();
            }}
          >
            {mode === "create" ? "Создать" : "Сохранить"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TaskEditorModal;
