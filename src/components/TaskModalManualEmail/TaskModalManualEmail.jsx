import { Button, Input, Modal } from "reactstrap";
import { MdEmail, MdDateRange } from "react-icons/md";
import moment from "moment";
import AvatarSymbols from "components/AvatarSymbols/AvatarSymbols";

const TaskModalManualEmail = ({ task, onClose }) => {
  // console.log(task);
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={true}
      toggle={() => onClose()}
    >
      <div className="modal-header text-center pb-2">
        <div className="w-100">
          <h4 className="modal-title w-100 pb-2">{task.Name}</h4>
          <div style={{ fontSize: "14px" }}>
            Последовательность: {task.Sequence.Title || "Неопределено"}
          </div>
        </div>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => onClose()}
          style={{ position: "absolute", right: "1.25rem" }}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row pb-4">
          <div className="col">
            <p className="mb-1" style={{ fontSize: "15px" }}>
              Тип задачи
            </p>
            <div>
              <MdEmail color="#1f88ff" size="1.5rem" />
              <span className="pl-2" style={{ fontSize: "14px" }}>
                E-mail
              </span>
            </div>
          </div>
          <div style={{ borderLeft: "1px solid #e7e7e7" }} className="col pl-4">
            <p className="mb-1" style={{ fontSize: "15px" }}>
              Действие
            </p>
            <div style={{ fontSize: "14px" }}>
              {task.Action === "send_letter" ? "Отправить письмо" : task.Action}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="mb-1" style={{ fontSize: "15px" }}>
              Старт задачи
            </p>
            <div style={{ opacity: 0.6 }}>
              <MdDateRange size="1.5rem" />
              <span className="pl-2" style={{ fontSize: "14px" }}>
                {moment(task.StartTime).format("DD.MM.YYYY HH:mm")}
              </span>
            </div>
          </div>
          <div style={{ borderLeft: "1px solid #e7e7e7" }} className="col pl-4">
            <p className="mb-1" style={{ fontSize: "15px" }}>
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
        <div className="pt-4 d-flex">
          <AvatarSymbols name={task.Contact.name} className="mr-2" />
          <div>
            <div className="" style={{ fontWeight: "600" }}>
              {task.Contact.name}
            </div>
            <div style={{ opacity: 0.6, fontSize: "14px" }}>
              {task.Contact.email}
            </div>
          </div>
        </div>
        <div>
          <p
            className="mb-1 mt-3"
            style={{ fontSize: "15px", fontWeight: "600" }}
          >
            Тема
          </p>
          <Input
            value={task.Subject}
            onChange={() => {}}
            style={{ color: "black" }}
          />
        </div>
        <div>
          <p
            className="mb-1 mt-3"
            style={{ fontSize: "15px", fontWeight: "600" }}
          >
            Тело письма
          </p>
          <Input
            value={task.Body}
            onChange={() => {}}
            type="textarea"
            style={{ minHeight: "130px" }}
          />
        </div>
      </div>
      <div className="modal-footer pt-0">
        <Button
          color="danger"
          outline
          data-dismiss="modal"
          type="button"
          onClick={() => onClose()}
        >
          Пропустить
        </Button>
        <Button color="primary" type="button">
          Отправить
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModalManualEmail;
