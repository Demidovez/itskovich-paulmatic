import { Button, Modal } from 'reactstrap';

const ModalYouSure = ({ isShow, title, text, onAgree, onCancel }) => {
  return (
    <Modal className="modal-dialog-centered" isOpen={isShow}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {title}
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={onCancel}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">{text}</div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button color="primary" type="button" onClick={onAgree}>
          Да
        </Button>
      </div>
    </Modal>
  );
};

export default ModalYouSure;
