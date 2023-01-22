import { useEffect, useState } from 'react';
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
} from 'reactstrap';

const SequencePageScheduleModalTime = ({
  isShow,
  onClose,
  onSubmit,
  value = 0,
}) => {
  const [ startH, setStartH ] = useState(0);
  const [ startM, setStartM ] = useState(0);
  const [ endH, setEndH ] = useState(0);
  const [ endM, setEndM ] = useState(0);

  useEffect(() => {
    setStartH(Math.floor(value.start / 2));
    setStartM((value.start % 2) * 30);
    setEndH(Math.floor(value.end / 2));
    setEndM((value.end % 2) * 30);
  }, [ JSON.stringify(value), isShow ]);

  const handleSubmit = () => {
    const x = startH * 2 + startM / 30;
    const w = endH * 2 + endM / 30 - x;

    onSubmit({ x, w });
    onClose();
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isShow}
      toggle={onClose}
      style={{
        maxWidth: '400px',
        width: '90%',
        minWidth: '200px',
        padding: '0.5rem 0',
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
                    <div className="d-flex align-items-center">
                      <Input
                        className="form-control-alternative p-0"
                        id="input-city"
                        placeholder={0}
                        value={startH}
                        onChange={(e) => setStartH(+e.target.value)}
                        type="number"
                        max={23}
                        min={0}
                        style={{ width: 50, textAlign: 'center' }}
                      />
                      <span className="pl-2 pr-2">:</span>
                      <Input
                        className="form-control-alternative p-0"
                        id="input-city"
                        placeholder={0}
                        value={startM}
                        onChange={(e) => setStartM(+e.target.value)}
                        type="number"
                        max={30}
                        min={0}
                        step={30}
                        style={{ width: 50, textAlign: 'center' }}
                      />
                    </div>
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
                    <div className="d-flex align-items-center">
                      <Input
                        className="form-control-alternative p-0"
                        id="input-city"
                        placeholder={0}
                        value={endH}
                        onChange={(e) => setEndH(+e.target.value)}
                        type="number"
                        max={23}
                        min={0}
                        style={{ width: 50, textAlign: 'center' }}
                      />
                      <span className="pl-2 pr-2">:</span>
                      <Input
                        className="form-control-alternative p-0"
                        id="input-city"
                        placeholder={0}
                        value={endM}
                        onChange={(e) => setEndM(+e.target.value)}
                        type="number"
                        max={30}
                        min={0}
                        step={30}
                        style={{ width: 50, textAlign: 'center' }}
                      />
                    </div>
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
