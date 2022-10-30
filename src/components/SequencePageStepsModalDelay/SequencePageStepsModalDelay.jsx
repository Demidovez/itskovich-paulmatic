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
import moment from "moment";

const SequencePageStepsModalDelay = ({
  isShow,
  onClose,
  onSubmit,
  value = 0,
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const duration = moment.duration(
      moment()
        .startOf("day")
        .add(value, "seconds")
        .diff(moment().startOf("day"))
    );

    const days = duration.asDays();
    const hours = duration.hours();
    const minutes = duration.minutes();

    setDays(Math.floor(days));
    setHours(hours);
    setMinutes(minutes);
  }, [value, isShow]);

  const handleSubmit = () => {
    onSubmit(days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
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
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      type="number"
                      min={0}
                      max={99}
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
                      value={hours}
                      onChange={(e) => setHours(+e.target.value)}
                      type="number"
                      max={23}
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
                      value={minutes}
                      onChange={(e) => setMinutes(+e.target.value)}
                      type="number"
                      max={59}
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
