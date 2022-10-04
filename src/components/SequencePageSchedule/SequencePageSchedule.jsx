import Checkbox from "components/Checkbox/Checkbox";
import SequenceTimeline from "components/SequenceTimeline/SequenceTimeline";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Button } from "reactstrap";
import "./SequencePageSchedule.scss";

const days = [
  {
    label: "Понедельник",
    name: "monday",
  },
  {
    label: "Вторник",
    name: "tuesday",
  },
  {
    label: "Среда",
    name: "wednesday",
  },
  {
    label: "Четверг",
    name: "thursday",
  },
  {
    label: "Пятница",
    name: "friday",
  },
  {
    label: "Суббота",
    name: "saturday",
  },
  {
    label: "Воскресенье",
    name: "sunday",
  },
];

const SequencePageSchedule = () => {
  const [checkedDays, setCheckedDays] = useState([]);
  const [jobs, setJobs] = useState({});

  const addCheckedDay = (index) => {
    setCheckedDays((checkedDays) =>
      checkedDays.includes(index)
        ? checkedDays.filter((day) => day !== index)
        : [...checkedDays, index]
    );
  };

  const addJob = (day) => {
    setJobs((jobs) => ({
      ...jobs,
      [day]: [
        ...(jobs[day] || []),
        {
          id: new Date().getTime(),
          content: new Date().getTime().toString().slice(-2),
          width: 100,
        },
      ],
    }));
  };

  const removeJob = (day, id) => {
    setJobs((jobs) => ({
      ...jobs,
      [day]: jobs[day].filter((job) => job.id !== id),
    }));
  };

  return (
    <div className="sequence-page-schedule-component ml--4 mr--4">
      <div className="header-schedule">
        <div className="d-flex">
          <div style={{ width: 200 }}></div>
          <div className="flex-fill d-flex justify-content-between">
            {Array(25)
              .fill()
              .map((_, i) => (
                <div key={i}>{i}</div>
              ))}
          </div>
          <div style={{ width: 100 }}></div>
        </div>
      </div>
      <div className="body-schedule">
        {days.map((day, index) => (
          <div className="row-schedule" key={day.name}>
            <div style={{ width: 200 }} onClick={() => addCheckedDay(index)}>
              <Checkbox
                id={index}
                checked={checkedDays.includes(index)}
                onChange={() => addCheckedDay(index)}
                label={day.label}
                className="pl-3"
                labelClassName="m-0"
                isStopPropagation={false}
              />
            </div>
            <div
              className={`d1-flex justify1-content-between timeline ${
                checkedDays.includes(index) ? "active" : ""
              }`}
            >
              <SequenceTimeline
                jobs={jobs[day.name]}
                setJobs={(editedJobs) =>
                  setJobs({ ...jobs, [day.name]: editedJobs })
                }
                onRemoveJob={(id) => removeJob(day.name, id)}
              />
            </div>
            <div
              style={{ width: 100 }}
              className="d-flex justify-content-center"
            >
              <Button
                color="secondary"
                type="button"
                className="p-1 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "50%", width: 30, height: 30 }}
                onClick={() => addJob(day.name)}
                disabled={!checkedDays.includes(index)}
              >
                <GrAdd />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequencePageSchedule;
