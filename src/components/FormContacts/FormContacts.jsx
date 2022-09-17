import { Card, CardBody, CardHeader, Input, Button } from "reactstrap";

const FormContacts = (props) => {
  return (
    <Card className="shadow" color="secondary">
      <CardHeader className="border-0">
        <h3 className="mb-0">Warner Corner</h3>
      </CardHeader>
      <CardBody>
        <Input className="mb-4" />
        <Input className="mb-4" />
        <Input className="mb-4" />
        <Input className="mb-4" />
        <Input className="mb-4" />
        <div className="d-flex justify-content-between">
          <div>
            <Button color="primary">Новый</Button>
            <Button color="primary">Сохранить</Button>
          </div>
          <Button color="danger" outline>
            Удалить
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormContacts;
