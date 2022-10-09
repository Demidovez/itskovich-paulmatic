import { Button, Input, Modal } from "reactstrap";
import { useEffect, useState } from "react";

const ModalCreateFolder = ({ isShow, onClose, onSubmit }) => {
  // const [currentTask, setCurrentTask] = useState(task);
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    isShow && setFolderName("");
  }, [isShow]);

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
            Создать новую папку
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
          Имя папки
        </p>
        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
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
        <Button
          color="primary"
          type="button"
          onClick={() => onSubmit(folderName)}
        >
          Создать
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCreateFolder;
