import DropdownCustom from "components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import { useLazyAddContactsToSequenceQuery } from "store/api/sequences";
import { useGetSequencesQuery } from "store/api/sequences";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./ModalAddToSequence.scss";
import { ROUTES } from "routes";
import { getpath } from "utils/utils";

const ModalAddToSequence = ({
  isShow,
  onCancel,
  clearSelectedIds,
  onSubmit,
}) => {
  const history = useHistory();
  const [selectedSequence, setSelectedSequence] = useState({});

  const { data } = useGetSequencesQuery({ body: {} });

  const addToSequance = () => {
    onSubmit(selectedSequence.id);
    onCancel();

    clearSelectedIds();
  };

  useEffect(() => {
    setSelectedSequence({});
  }, [isShow]);

  return (
    <Modal
      className="modal-dialog-centered modal-add-to-sequence-component"
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
      {((data || {}).Items || []).length > 0 ? (
        <>
          <div className="modal-body d-flex flex-column p-0">
            {((data || {}).Items || []).map((item) => (
              <div
                key={item.id}
                className={`sequence-name d-flex align-items-center`}
                onClick={() => setSelectedSequence(item)}
              >
                {item.Name === selectedSequence.Name ? (
                  <BsCheckCircleFill color="#5e72e4" size="1.2rem" />
                ) : (
                  <BsCircle color="#b8b8b8" size="1.2rem" />
                )}
                <span className="ml-2">{item.Name}</span>
              </div>
            ))}
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
        </>
      ) : (
        <div
          className="d-flex flex-column align-items-center text-center"
          style={{ fontSize: 14 }}
        >
          У Вас отсутствуют последовательности.
          <br />
          Для создания перейдите на страницу «Последовательности»
          <br />
          <Button
            color="primary"
            data-dismiss="modal"
            type="button"
            onClick={() =>
              history.push("/admin" + getpath(ROUTES.sequences.path))
            }
            outline
            className="m-3"
          >
            Перейти
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ModalAddToSequence;
