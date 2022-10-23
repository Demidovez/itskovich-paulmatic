import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardHeader, Progress, Table, Row } from "reactstrap";

const CLASSES_PROGRESS = {
  0: "bg-gradient-danger",
  20: "bg-gradient-warning",
  40: "",
  60: "bg-gradient-info",
  80: "bg-gradient-success",
};

const DashboardTypesInteractions = ({
  tasks = { Sequences: { Total: { Values: {} } } },
}) => {
  const [all, setAll] = useState({
    completed: 0,
    replied: 0,
    skipped: 0,
  });

  useEffect(() => {
    if (tasks.Sequences.Total.completed) {
      setAll((all) => ({
        ...all,
        completed: Object.values(tasks.Sequences.Total.completed).reduce(
          (acc, val) => (acc += val),
          0
        ),
      }));
    }
  }, [tasks.Sequences.Total.completed]);

  useEffect(() => {
    if (tasks.Sequences.Total.replied) {
      setAll((all) => ({
        ...all,
        replied: Object.values(tasks.Sequences.Total.replied).reduce(
          (acc, val) => (acc += val),
          0
        ),
      }));
    }
  }, [tasks.Sequences.Total.replied]);

  useEffect(() => {
    if (tasks.Sequences.Total.skipped) {
      setAll((all) => ({
        ...all,
        skipped: Object.values(tasks.Sequences.Total.skipped).reduce(
          (acc, val) => (acc += val),
          0
        ),
      }));
    }
  }, [tasks.Sequences.Total.skipped]);

  const [activeType, setActiveType] = useState("completed");

  const types = useSelector((state) => state.common.Tasks.Types);

  return (
    <Card className="shadow" id="types">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Типы взаимодействий</h3>
          </div>
          <div>
            <Button
              color="primary"
              onClick={() => setActiveType("completed")}
              size="sm"
              disabled={all.completed === 0}
            >
              Завершенные
            </Button>
            <Button
              color="primary"
              onClick={() => setActiveType("replied")}
              size="sm"
              disabled={all.replied === 0}
            >
              Отвеченные
            </Button>
            <Button
              color="primary"
              onClick={() => setActiveType("skipped")}
              size="sm"
              disabled={all.skipped === 0}
            >
              Пропущенные
            </Button>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <tbody>
          {Object.entries(types).map(([type, data]) => {
            const task = (tasks.Sequences.Total.Values || {})[activeType] || {};
            const progress = Math.round(
              (all[activeType] ? (task[type] || 0) / all[activeType] : 0) * 100
            );

            console.log(all[activeType]);

            return (
              <tr key={type}>
                <th scope="row">{data.Creds.Title}</th>
                <td>{task[type]}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">{progress}%</span>
                    <div>
                      <Progress
                        max={100}
                        value={progress || 0}
                        barClassName={
                          CLASSES_PROGRESS[Math.floor(progress / 20) * 20]
                        }
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
          {/* {Object.entries(
            (tasks.Sequences.Total.Values || {})[activeType] || {}
          ).map(([task, value]) => {
            const progress = Math.round((value / all[activeType]) * 100);

            return (
              <tr key={task}>
                <th scope="row">{task}</th>
                <td>{value}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">{progress}%</span>
                    <div>
                      <Progress
                        max={100}
                        value={progress || 0}
                        barClassName={
                          CLASSES_PROGRESS[Math.floor(progress / 20) * 20]
                        }
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </Table>
    </Card>
  );
};

export default DashboardTypesInteractions;
