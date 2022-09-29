import { useSelector } from "react-redux";
import { Row, Card, Col, CardBody, CardTitle } from "reactstrap";

const labels = {
  completed: "Завершенных",
  skipped: "Пропущенных",
  started: "Начатых",
};

const TasksBarStatsByStatus = () => {
  const {
    Statuses,
    Stats: { All, ByStatus },
  } = useSelector((state) => state.common.Tasks);

  return (
    <Card className="card-stats mb-4 mb-xl-0 mr-4 shadow">
      <CardBody className="pt-2 pb-1 ">
        <Row>
          {Statuses.map((status) => (
            <div className="col" key={status}>
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                {labels[status]}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                {ByStatus[status]}
              </span>
            </div>
          ))}
          <Col className="col-auto d-flex flex-column align-items-center">
            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
              {All}
            </div>
            <span style={{ fontSize: 12, opacity: 0.7 }}>всего</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TasksBarStatsByStatus;
