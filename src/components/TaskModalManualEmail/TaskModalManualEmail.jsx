import { Button, Input, Modal } from "reactstrap";
import { MdEmail, MdDateRange, MdGppGood } from "react-icons/md";
import moment from "moment";
import AvatarSymbols from "components/AvatarSymbols/AvatarSymbols";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useCallback, useEffect, useState } from "react";
import { usePrompt } from "hooks/usePrompt";
import AttachFilesBar from "components/AttachFilesBar/AttachFilesBar";
import { useSelector } from "react-redux";
import pupa from "pupa";
import useYouSure from "hooks/useYouSure";

const TaskModalManualEmail = ({
  task,
  onClose,
  onExecute,
  onSkip,
  onReplied,
}) => {
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);
  const [currentTask, setCurrentTask] = useState(task);

  const updateCurrentTask = (task) => {
    setCurrentTask(task);
  };

  const onEvent = (callback, data) => {
    if (data.task) {
      callback(data.task, data.toastMessage);
    } else {
      callback(data);
    }
  };

  const [attachedFiles, setAttachedFiles] = useState([]);

  const [emailBody, setEmailBody] = useState("");
  const emailTemplates = useSelector((state) => state.common.Templates.Cache);
  const account = useSelector((state) => state.common.Account);

  useEffect(() => {
    const [template, key] = task.Body.split(":");
    const emailBody =
      template === "template" ? emailTemplates[key] || task.Body : task.Body;

    const injectedEmailBody = pupa(emailBody.replaceAll("{{.", "{{"), {
      Contact: {
        ...Object.fromEntries(
          Object.entries(task.Contact).map(([k, v]) => [
            k[0].toUpperCase() + k.slice(1),
            v,
          ])
        ),
      },
      Me: {
        ...account,
      },
    });

    setEmailBody(injectedEmailBody);
  }, [task.Body, emailTemplates, account]);

  const onKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.which === 13) {
        onEvent(onExecute, {
          task: currentTask,
          toastMessage: "Письмо отправлено!",
        });
      }
    },
    [onExecute, JSON.stringify(currentTask)]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (
      JSON.stringify({ ...currentTask, Body: "" }) !==
      JSON.stringify({ ...task, Body: "" })
    ) {
      setIsChanged(true);
    } else if (
      currentTask.Body.replace(/(<([^>]+)>)/gi, "") !==
      task.Body.replace(/(<([^>]+)>)/gi, "")
    ) {
      setIsChanged(true);
    }
  }, [JSON.stringify(currentTask), task]);

  return (
    <>
      <Modal
        className="modal-dialog-centered mt-0 mb-0 flex-column"
        contentClassName="h-100 flex-fill"
        isOpen={true}
        toggle={tryClose}
        style={{
          maxWidth: "1000px",
          width: "90%",
          minWidth: "400px",
          minHeight: "100%",
          padding: "2.5rem 0",
        }}
      >
        <div className="modal-header text-center pb-2">
          <div className="w-100">
            <h4 className="modal-title w-100 pb-2 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center">
                <MdEmail color="#1f88ff" size="1.5rem" className="mr-1" />
                {currentTask.Name}
              </div>
            </h4>
            <div style={{ fontSize: "14px" }}>
              Последовательность: {currentTask.Sequence.Name || "Неопределено"}
            </div>
          </div>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={tryClose}
            style={{ position: "absolute", right: "1.25rem" }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body d-flex flex-column">
          <div className="row">
            <div className="col d-flex justify-content-between">
              <div>
                <p className="mb-1 pl-1" style={{ fontSize: "15px" }}>
                  Старт задачи
                </p>
                <div style={{ opacity: 0.6 }}>
                  <MdDateRange size="1.5rem" />
                  <span className="pl-2" style={{ fontSize: "14px" }}>
                    {moment(currentTask.StartTime).format("DD.MM.YYYY HH:mm")}
                  </span>
                </div>
              </div>
              <div className="pr-4">
                <p className="mb-1 pl-1" style={{ fontSize: "15px" }}>
                  Срок выполнения
                </p>
                <div style={{ opacity: 0.6 }}>
                  <MdDateRange size="1.5rem" />
                  <span className="pl-2" style={{ fontSize: "14px" }}>
                    {moment(task.DueTime).format("DD.MM.YYYY HH:mm")}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col pl-5 d-flex"
              style={{ borderLeft: "1px solid #e7e7e7" }}
            >
              <AvatarSymbols name={currentTask.Contact.name} className="mr-3" />
              <div>
                <div className="" style={{ fontWeight: "600" }}>
                  {currentTask.Contact.name}
                </div>
                <div style={{ opacity: 0.6, fontSize: "14px" }}>
                  {currentTask.Contact.email}
                </div>
              </div>
            </div>
          </div>
          <p
            className="pt-4 d-flex align-items-center"
            style={{ fontSize: "18px", fontWeight: 600 }}
          >
            <MdGppGood color="green" size="1.5rem" />
            <span className="pl-2">{currentTask.Description}</span>
          </p>
          <div>
            <p
              className="mb-1 mt-1"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Тема письма
            </p>
            <Input
              value={currentTask.Subject}
              disabled={currentTask.Status !== "started"}
              onChange={(e) =>
                updateCurrentTask({ ...currentTask, Subject: e.target.value })
              }
              style={{ color: "black" }}
            />
          </div>
          <div
            className="d-flex flex-fill flex-column mt-3"
            style={{ height: 0, minHeight: "400px" }}
          >
            <div className="d-flex justify-content-between  mb-1">
              <p
                className="m-0"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                Тело письма
              </p>
              <AttachFilesBar
                disabled={currentTask.Status !== "started"}
                onFileDeattach={(lastModified) =>
                  setAttachedFiles((files) =>
                    files.filter((file) => file.lastModified !== lastModified)
                  )
                }
                onFileAttached={(file) =>
                  setAttachedFiles((files) => [...files, file])
                }
              />
            </div>
            <EditorEmail
              files={attachedFiles}
              content={emailBody}
              disabled={currentTask.Status !== "started"}
              onChange={(Body) =>
                currentTask.Status === "started" &&
                updateCurrentTask({ ...currentTask, Body })
              }
            />
          </div>
        </div>
        <div className="modal-footer pt-0">
          {currentTask.Status !== "started" ? (
            <>
              {currentTask.Status === "completed" ? (
                <Button
                  color="info"
                  outline
                  onClick={() => onEvent(onReplied, currentTask)}
                >
                  Ответ получен
                </Button>
              ) : null}
              <Button color="primary" onClick={tryClose}>
                Закрыть
              </Button>
            </>
          ) : (
            <>
              <Button
                color="danger"
                outline
                data-dismiss="modal"
                type="button"
                onClick={() => onEvent(onSkip, currentTask)}
              >
                Пропустить
              </Button>
              <Button
                color="primary"
                type="button"
                onClick={() =>
                  onEvent(onExecute, {
                    task: currentTask,
                    toastMessage: "Письмо отправлено!",
                  })
                }
              >
                Отправить
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TaskModalManualEmail;
