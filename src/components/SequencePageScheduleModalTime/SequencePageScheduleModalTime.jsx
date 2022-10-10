import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";

const SequencePageScheduleModalTime = ({
  isShow,
  onClose,
  onSubmit,
  value = 0,
}) => {
  const [period, setPeriod] = useState(value);

  useEffect(() => {
    setPeriod(value);
  }, [JSON.stringify(value), isShow]);

  const handleSubmit = () => {
    onSubmit(period);
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
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Время задачи</h3>
            </Col>
            <Col className="text-right" xs="4">
              <button
                aria-label="Close"
                className="close mt-1"
                data-dismiss="modal"
                type="button"
                onClick={onClose}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <div className="">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      Начало
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-city"
                      placeholder={0}
                      value={period.start}
                      onChange={(e) =>
                        setPeriod({ ...period, start: +e.target.value })
                      }
                      type="number"
                      min={0}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-country"
                    >
                      Конец
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-country"
                      placeholder={0}
                      value={period.end}
                      onChange={(e) =>
                        setPeriod({ ...period, end: +e.target.value })
                      }
                      type="number"
                      min={0}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
          <div className="modal-footer p-0 mt-3">
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
              Изменить
            </Button>
          </div>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default SequencePageScheduleModalTime;
