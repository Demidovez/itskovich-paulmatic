import React from "react";
import { useSelector } from "react-redux";
import { Row, Card, Col, CardBody, CardTitle } from "reactstrap";

const TasksBarStatsByType = () => {
  const {
    Types,
    Stats: { All, ByType },
  } = useSelector((state) => state.common.Tasks);

  console.log(All, ByType, Types);

  return (
    <Card className="card-stats mb-4 mb-xl-0 shadow">
      <CardBody className="pt-2 pb-1 ">
        <Row>
          {[...Object.values(Types)]
            .sort((t1, t2) => t1.Order - t2.Order)
            .map((type) => (
              <div className="col" key={type.Creds.Name}>
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-0 text-nowrap"
                >
                  {type.Creds.Title}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">
                  {ByType[type.Creds.Name]}
                </span>
              </div>
            ))}
          <Col className="col-auto d-flex flex-column align-items-center">
            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
              {All}
            </div>
            <span style={{ fontSize: 12, opacity: 0.7 }}>всего</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default React.memo(TasksBarStatsByType);
