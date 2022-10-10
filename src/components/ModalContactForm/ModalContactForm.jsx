import { useEffect, useState } from "react";
import {
  Card,
  Modal,
  CardBody,
  CardHeader,
  Input,
  Button,
  Row,
} from "reactstrap";

const ModalContactForm = ({ contact, isShow, onSave, onRemove, onClose }) => {
  const [currentContact, setCurrentContact] = useState(contact || {});

  useEffect(() => {
    setCurrentContact(contact || {});
  }, [contact]);

  const handleSave = () => {
    onSave(currentContact);
    setCurrentContact({});
  };

  const handleRemove = () => {
    onRemove(currentContact.id);
    setCurrentContact({});
  };

  const onInputChange = ({ target }, field) =>
    setCurrentContact({ ...currentContact, [field]: target.value });

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
      <Card className={`shadow`} color="secondary">
        <CardHeader className="border-0 modal-header text-center pb-3">
          <h3 className="mb-0">{currentContact.name || "Новый контакт"}</h3>
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
        </CardHeader>
        <CardBody>
          <Input
            className="mb-4"
            placeholder={"Имя"}
            value={currentContact.name || ""}
            onChange={(e) => onInputChange(e, "name")}
          />
          <Input
            className="mb-4"
            value={currentContact.email || ""}
            placeholder={"Email"}
            onChange={(e) => onInputChange(e, "email")}
          />
          <Input
            className="mb-4"
            value={currentContact.phone || ""}
            placeholder={"Телефон"}
            onChange={(e) => onInputChange(e, "phone")}
          />
          <Input
            className="mb-4"
            value={currentContact.company || ""}
            placeholder={"Компания"}
            onChange={(e) => onInputChange(e, "company")}
          />
          <Input
            className="mb-4"
            placeholder={"LinkedIn"}
            value={currentContact.linkedin || ""}
            onChange={(e) => onInputChange(e, "linkedin")}
          />
          <Row>
            <div className="col">
              {contact && onRemove ? (
                <Button
                  color="danger"
                  className="w-100"
                  outline
                  onClick={handleRemove}
                >
                  Удалить
                </Button>
              ) : (
                <Button
                  color="danger"
                  className="w-100"
                  outline
                  onClick={onClose}
                >
                  Отмена
                </Button>
              )}
            </div>
            <div className="col">
              <Button
                color="primary"
                className="w-100"
                onClick={handleSave}
                disabled={!currentContact.name || !currentContact.email}
              >
                {contact ? "Сохранить" : "Создать"}
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default ModalContactForm;
