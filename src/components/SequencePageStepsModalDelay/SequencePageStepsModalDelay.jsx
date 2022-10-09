import { Button, Input, Modal } from "reactstrap";
import { MdEmail, MdDateRange, MdGppGood } from "react-icons/md";
import moment from "moment";
import AvatarSymbols from "components/AvatarSymbols/AvatarSymbols";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useState } from "react";

const SequencePageStepsModalDelay = ({
  isShow,
  onClose,
  onSubmit,
  value = 0,
}) => {
  const [delay, setDelay] = useState(value);

  useEffect(() => {
    setDelay(value);
  }, [value]);

  const handleSubmit = () => {
    onSubmit(delay);
    onClose();
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isShow}
      toggle={onClose}
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
            Укажите задержку для выполнения шага
          </h4>
        </div>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={onClose}
          style={{ position: "absolute", right: "1.25rem" }}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body d-flex flex-column">
        <p className="mb-0" style={{ opacity: 0.7, fontSize: "14px" }}>
          Задержка
        </p>
        <Input value={delay} onChange={(e) => setDelay(e.target.value)} />
      </div>
      <div className="modal-footer pt-0">
        <Button
          color="danger"
          outline
          data-dismiss="modal"
          type="button"
          onClick={onClose}
        >
          Отмена
        </Button>
        <Button color="primary" type="button" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default SequencePageStepsModalDelay;
