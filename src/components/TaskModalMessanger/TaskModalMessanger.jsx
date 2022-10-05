import { Button, Input, Modal } from "reactstrap";
import { MdContentCopy, MdDateRange, MdGppGood } from "react-icons/md";
import moment from "moment";
import AvatarSymbols from "components/AvatarSymbols/AvatarSymbols";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useMemo, useRef, useState } from "react";
import TaskIcon from "components/TaskIcon/TaskIcon";
import useRefCallback from "hooks/useRefCallback";
import { usePrompt } from "hooks/usePrompt";

const TaskModalMessanger = ({ task, onClose, onExecute, onSkip }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  const [inputMessage, setRefMessage] = useRefCallback();

  const updateCurrentTask = (task) => {
    setCurrentTask(task);
    setIsChanged(true);
  };

  const onEvent = (callback, data) => {
    callback(data);
    setIsChanged(false);
  };

  useEffect(() => {
    inputMessage && inputMessage.focus();
  }, [inputMessage]);

  const saveToBuffer = () => {
    navigator.clipboard.writeText(currentTask.Body);
  };

  usePrompt(isChanged);

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={true}
      toggle={() => onEvent(onClose)}
      style={{
        maxWidth: "800px",
        width: "90%",
        minWidth: "400px",
        padding: "2.5rem 0",
      }}
    >
      <div className="modal-header text-center pb-2 d-flex justify-content-center">
        <div className="w1-100">
          <h4 className="modal-title w1-100 pb-2 d1-flex justify1-content-center">
            <div className="d-flex justify-content-center align-items-center">
              <TaskIcon type={currentTask.Type} className="mr-2" />
              <div className="text-nowrap">{currentTask.Name}</div>
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
          onClick={() => onEvent(onClose)}
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
            className="col d-flex"
            style={{ borderLeft: "1px solid #e7e7e7" }}
          >
            <AvatarSymbols
              name={currentTask.Contact.name}
              className="ml-4 mr-3"
            />
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

          <span
            className="pl-2"
            dangerouslySetInnerHTML={{ __html: currentTask.Description }}
          />
        </p>
        <div
          className="d-flex flex-fill flex-column"
          style={{ height: 0, minHeight: "200px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <p
              className="mb-1 mt-3"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Сообщение
            </p>
            <Button
              className="btn-icon btn-3"
              color="info"
              type="button"
              size="sm"
              onClick={saveToBuffer}
              disabled={currentTask.Status !== "started"}
            >
              <MdContentCopy size="1rem" />
              <span>Скопировать</span>
            </Button>
          </div>
          <Input
            type="textarea"
            value={currentTask.Body}
            className="h-100"
            disabled={currentTask.Status !== "started"}
            onChange={(e) =>
              updateCurrentTask({ ...currentTask, Body: e.target.value })
            }
            innerRef={setRefMessage}
            onFocus={(event) => event.target.select()}
          />
        </div>
      </div>
      <div className="modal-footer pt-0">
        {currentTask.Status !== "started" ? (
          <Button color="primary" onClick={() => onEvent(onClose)}>
            Закрыть
          </Button>
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
              onClick={() => onEvent(onExecute, currentTask)}
            >
              Готово
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default TaskModalMessanger;
