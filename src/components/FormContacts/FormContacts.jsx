import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Input, Button } from "reactstrap";

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
          value={currentContact.name || ""}
          onChange={(e) => onInputChange(e, "name")}
        />
        <Input
          className="mb-4"
          value={currentContact.email || ""}
          onChange={(e) => onInputChange(e, "email")}
        />
        <Input
          className="mb-4"
          value={currentContact.phone || ""}
          onChange={(e) => onInputChange(e, "phone")}
        />
        <Input
          className="mb-4"
          value={currentContact.company || ""}
          onChange={(e) => onInputChange(e, "company")}
        />
        <Input
          className="mb-4"
          value={currentContact.linkedin || ""}
          onChange={(e) => onInputChange(e, "linkedin")}
        />
        <div className="d-flex justify-content-between">
          <div>
            <Button color="primary" onClick={onNew}>
              Новый
            </Button>
            <Button
              color="primary"
              onClick={handleSave}
              disabled={Object.keys(currentContact).length === 0}
            >
              Сохранить
            </Button>
          </div>
          {contact.id && (
            <Button color="danger" outline onClick={handleRemove}>
              Удалить
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default FormContacts;
