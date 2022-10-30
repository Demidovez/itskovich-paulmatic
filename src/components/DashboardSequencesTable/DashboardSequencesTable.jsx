import { Button, Card, CardHeader, Table, Row, Progress } from "reactstrap";
import { MdPersonOutline, MdOutlineEmail } from "react-icons/md";
import "./DashboardSequencesTable.scss";
// <i className="fas fa-arrow-up text-success mr-3" />

const DashboardSequencesTable = ({ sequences = [] }) => {
  return (
    <Card
      className="dashboard-sequences-table-component shadow h-100"
      id="sequences"
    >
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Последовательности</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Все
            </Button>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Люди</th>
            <th scope="col">Open Rate</th>
            <th scope="col">Reply Rate</th>
            <th scope="col">Bounce rate</th>
            <th scope="col">Отправлено</th>
            <th scope="col">Прогресс</th>
          </tr>
        </thead>
        <tbody>
          {sequences.map((sequence) => {
            const all =
              sequence.OpenRate + sequence.ReplyRate + sequence.BounceRate;

            return (
              <tr key={sequence.id}>
                <th scope="row">{sequence.Name}</th>
                <td>
                  <div className="d-flex">
                    <div>
                      <MdPersonOutline
                        size="1.25rem"
                        style={{ opacity: 0.3, marginTop: "-2px" }}
                        className="mr-1"
                      />
                    </div>
                    {sequence.People}
                  </div>
                </td>
                <td>
                  <strong className="pr-1">
                    {Math.round((all ? sequence.OpenRate / all : 0) * 100)}%
                  </strong>{" "}
                  ({sequence.OpenRate})
                </td>
                <td>
                  <strong className="pr-1">
                    {Math.round((all ? sequence.ReplyRate / all : 0) * 100)}%
                  </strong>{" "}
                  ({sequence.ReplyRate})
                </td>
                <td>
                  <strong className="pr-1">
                    {Math.round((all ? sequence.BounceRate / all : 0) * 100)}%
                  </strong>{" "}
                  ({sequence.BounceRate})
                </td>
                <td>
                  <div className="d-flex">
                    <MdOutlineEmail
                      size="1.25rem"
                      style={{ opacity: 0.3 }}
                      className="mr-1"
                    />
                    {sequence.EmailSendingCount}
                  </div>
                </td>
                <td>
                  <Progress
                    max="1"
                    value={sequence.Progress || 0}
                    style={{
                      height: "8px",
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {sequences.length === 0 ? (
        <div className="label-no-sequences">
          У пользователя нет пока последовательностей...
        </div>
      ) : null}
    </Card>
  );
};

export default DashboardSequencesTable;
