import Checkbox from "components/Checkbox/Checkbox";
import Pagination from "components/Pagination/Pagination";
import TableTasks from "components/TableTasks/TableTasks";
import TaskSort from "components/TaskSort/TaskSort";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Card,
  CardHeader,
  Col,
  CardFooter,
  CardBody,
  CardTitle,
} from "reactstrap";
import { selectAllTasks } from "store/slices/tasksSlice";

const Tasks = () => {
  const dispatch = useDispatch();

  const isSelectedAll = useSelector((state) => state.tasks.isSelectedAll);

  const onSelectAllTasks = () => dispatch(selectAllTasks(!isSelectedAll));

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column overflow-hidden height-fill pb-3"
      >
        <Row className="pt-3 pb-3">
          <div className="col col-2 d-flex align-items-center">
            <h1 className="mt-4 mb-4 mr-3">Задачи</h1>
          </div>
          <div className="col col-10 d-flex align-items-center justify-content-end">
            <Card className="card-stats mb-4 mb-xl-0 mr-4 shadow">
              <CardBody className="pt-2 pb-2">
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Новых
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">3</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Due
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Завершенных
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">1</span>
                  </div>
                  <Col className="col-auto d-flex flex-column align-items-center">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      4
                    </div>
                    <span style={{ fontSize: 12, opacity: 0.7 }}>всего</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody className="pt-2 pb-2">
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      LinkedIn
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">4</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Calls
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Почта
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      SMS
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      WhatsApp
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Разное
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Встречи
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">0</span>
                  </div>
                  <Col className="col-auto d-flex flex-column align-items-center">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      4
                    </div>
                    <span style={{ fontSize: 12, opacity: 0.7 }}>всего</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>

        <Card className="shadow flex-fill overflow-hidden">
          <CardHeader className="border-0">
            <Row className="d-flex align-items-center">
              <Col
                md={6}
                className="d-flex justify-content-start align-items-center"
              >
                <Checkbox
                  label="Все"
                  scale={1.25}
                  checked={isSelectedAll}
                  onChange={onSelectAllTasks}
                />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <div className="d-flex align-items-center">
                  <i
                    className="fas fa-history pr-2"
                    style={{ fontSize: 20, opacity: 0.6 }}
                  ></i>
                  <TaskSort />
                </div>
              </Col>
            </Row>
          </CardHeader>
          <TableTasks />
        </Card>
      </Container>
    </>
  );
};

export default Tasks;
