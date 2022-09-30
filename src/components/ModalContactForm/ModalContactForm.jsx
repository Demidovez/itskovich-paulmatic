import { Button, Input, Modal } from "reactstrap";
import { MdEmail, MdDateRange, MdGppGood } from "react-icons/md";
import moment from "moment";
import AvatarSymbols from "components/AvatarSymbols/AvatarSymbols";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useState } from "react";

const ModalContactForm = ({
  contact,
  isShow,
  onNew,
  onSave,
  onRemove,
  onClose,
}) => {
  // const [currentTask, setCurrentTask] = useState(task);

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isShow}
      toggle={() => onClose()}
      style={{
        maxWidth: "500px",
        width: "90%",
        minWidth: "200px",
        padding: "0.5rem 0",
      }}
    >
      <div className="modal-header text-center pb-2">
        <div className="w-100">
          <h4 className="modal-title w-100 pb-2 d-flex justify-content-center">
            Форма
          </h4>
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
      <div className="modal-body d-flex flex-column"></div>
      <div className="modal-footer pt-0">
        <Button
          color="danger"
          outline
          data-dismiss="modal"
          type="button"
          // onClick={() => onSkip(currentTask)}
        >
          Пропустить
        </Button>
        <Button
          color="primary"
          type="button"
          // onClick={() => onExecute(currentTask)}
        >
          Отправить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalContactForm;
