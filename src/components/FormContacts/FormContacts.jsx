import { useEffect, useState } from "react";
import {
  Card,
  Col,
  CardBody,
  CardHeader,
  Input,
  Button,
  Row,
} from "reactstrap";

const DEFAULT_CONTACT = {
  name: "",
};

const FormContacts = ({
  contact,
  onNew,
  onSave,
  onRemove,
  className = "",
  style = {},
}) => {
  const [currentContact, setCurrentContact] = useState(contact || {});

  useEffect(() => {
    contact && setCurrentContact(contact);
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
    <Card className={`${className} shadow`} color="secondary" style={style}>
      <CardHeader className="border-0">
        <h3 className="mb-0">{currentContact.name || "Новый контакт"}</h3>
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
          <div className="col mb-3">
            <Button color="primary" onClick={onNew} className="w-100">
              Новый
            </Button>
          </div>
          <div className="col mb-3">
            <Button
              color="primary"
              className="w-100"
              onClick={handleSave}
              disabled={!currentContact.name || !currentContact.email}
            >
              Сохранить
            </Button>
          </div>
        </Row>

        {contact.id && (
          <Row>
            <div className="col">
              <Button
                color="danger"
                className="w-100"
                outline
                onClick={handleRemove}
              >
                Удалить
              </Button>
            </div>
          </Row>
        )}

        {/* <div className="d-flex justify-content-between">
          <div>
            
            
          </div>
          <div></div>
          
        </div> */}
      </CardBody>
    </Card>
  );
};

export default FormContacts;
