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

const SequencePageStepsModalDelay = ({
  isShow,
  onClose,
  onSubmit,
  value = 0,
}) => {
  const [delay, setDelay] = useState(value);

  useEffect(() => {
    setDelay(value);
  }, [JSON.stringify(value)]);

  const handleSubmit = () => {
    onSubmit(delay);
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
              <h3 className="mb-0">Задержка шага</h3>
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
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      Дней
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-city"
                      placeholder={0}
                      value={delay.days}
                      onChange={(e) =>
                        setDelay({ ...delay, days: +e.target.value })
                      }
                      type="number"
                      min={0}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-country"
                    >
                      Часов
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-country"
                      placeholder={0}
                      value={delay.hours}
                      onChange={(e) =>
                        setDelay({ ...delay, hours: +e.target.value })
                      }
                      type="number"
                      min={0}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-country"
                    >
                      Минут
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-postal-code"
                      placeholder={0}
                      value={delay.minutes}
                      onChange={(e) =>
                        setDelay({ ...delay, minutes: +e.target.value })
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
              Добавить
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* <div className="modal-header text-center pb-2">
        
      </div>
      <div className="modal-body d-flex flex-column">
        <p className="mb-0" style={{ opacity: 0.7, fontSize: "14px" }}>
          Задержка
        </p>
        <Input value={delay} onChange={(e) => setDelay(e.target.value)} />
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
        <Button color="primary" type="button" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div> */}
    </Modal>
  );
};

export default SequencePageStepsModalDelay;
