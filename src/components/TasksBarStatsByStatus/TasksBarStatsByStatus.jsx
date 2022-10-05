import { useSelector } from "react-redux";
import { Row, Card, Col, CardBody, CardTitle } from "reactstrap";

const labels = {
  completed: "Завершенных",
  skipped: "Пропущенных",
  started: "Начатых",
  expired: "Просроченных",
};

const TasksBarStatsByStatus = () => {
  const {
    Statuses,
    Stats: { All, ByStatus },
  } = useSelector((state) => state.common.Tasks);

  return (
    <Card className="card-stats mb-4 mb-xl-0 mr-4 shadow h-100">
      <CardBody className="pt-2 pb-1">
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
        </Row>
      </CardBody>
    </Card>
  );
};

export default TasksBarStatsByStatus;
