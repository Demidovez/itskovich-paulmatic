import { Button, Input, Modal } from "reactstrap";
import { useEffect, useState } from "react";
import "./ModalCreateFolder.scss";

const ModalCreateFolder = ({ isShow, onClose, onSubmit, folder, onDelete }) => {
  // const [currentTask, setCurrentTask] = useState(task);
  const [folderName, setFolderName] = useState(folder.Name);

  return (
    <Modal
      className="modal-create-folder modal-dialog-centered"
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
          <h4 className="modal-title w-100 pb-2 d-flex">
            {folder.id ? "Изменить папку" : "Создать новую папку"}
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
      <div className="modal-footer pt-0 justify-content-between">
        {folder.id ? (
          <div onClick={onDelete} className="delete-folder">
            удалить
          </div>
        ) : null}
        <div>
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
            onClick={() => onSubmit({ ...folder, Name: folderName })}
          >
            {folder.id ? "Изменить" : "Создать"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateFolder;
