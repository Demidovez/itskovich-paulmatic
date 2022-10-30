import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { RiMailSendLine } from "react-icons/ri";

const DashBoardStatistics = ({
  tasks = { Sequences: { Total: { Values: {} } } },
  sequences = [],
}) => {
  const { manual_email, auto_email } = tasks.Sequences.Total.Values
    .completed || { auto_email: 0, manual_email: 0 };

  const allCountersCompleted = Object.values(
    tasks.Sequences.Total.Values.completed || {}
  ).reduce((acc, val) => (acc += val), 0);

  const allCountersReplied = Object.values(
    tasks.Sequences.Total.Values.replied || {}
  ).reduce((acc, val) => (acc += val), 0);

  const openRate = sequences.length
    ? sequences.reduce((acc, seq) => (acc += seq.OpenRate), 0) /
      sequences.length
    : 0;

  return (
    <>
      <div className="header bg-gradient-info pb-6 pt-6">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3" id="first-stat">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Количество отправленных E-mail
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {manual_email + auto_email || 0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <RiMailSendLine />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Конверсия ответов (Reply Rate)
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {(allCountersCompleted
                            ? Math.round(
                                allCountersReplied / allCountersCompleted
                              )
                            : 0) * 100}
                          %
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Open Rate
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {openRate}%
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Количество закрытых тасков
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {allCountersCompleted}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DashBoardStatistics;
