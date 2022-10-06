import DropdownCustom from "components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import { useLazyAddContactsToSequenceQuery } from "store/api/sequences";
import { useGetSequencesQuery } from "store/api/sequences";
import { useLazyGetSequencesQuery } from "store/api/sequences";

const ModalAddToSequence = ({ isShow, ids, onCancel, clearSelectedIds }) => {
  const [sendToSequence] = useLazyAddContactsToSequenceQuery();
  const [selectedSequence, setSelectedSequence] = useState({});

  const { data } = useGetSequencesQuery({ body: {} });

  const addToSequance = () => {
    onCancel();
    clearSelectedIds();
    sendToSequence({ sequence: selectedSequence, ids });
  };

  useEffect(() => {
    setSelectedSequence({});
  }, [isShow]);

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isShow}
      toggle={() => onCancel()}
    >
      <div className="modal-header align-items-center">
        <h5 className="modal-title" id="exampleModalLabel">
          Добавить в последовательность
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
      <div className="modal-body d-flex flex-column">
        <DropdownCustom
          items={(data || {}).Items || []}
          fieldOfItem="Name"
          classNameButton="w-100"
          defaultValue="Выберите последовательность"
          onSelect={setSelectedSequence}
        />
      </div>
      <div className="modal-footer">
        <Button
          color="danger"
          data-dismiss="modal"
          type="button"
          onClick={onCancel}
          outline
        >
          Отмена
        </Button>
        <Button
          color="primary"
          type="button"
          onClick={addToSequance}
          disabled={!selectedSequence.id}
        >
          Добавить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAddToSequence;
