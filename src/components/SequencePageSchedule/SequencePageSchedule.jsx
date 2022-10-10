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

const SequencePageSchedule = ({ onChange }) => {
  const [checkedDays, setCheckedDays] = useState([]);
  const [jobs, setJobs] = useState({});
  const [isFullTimeline, setIsFullTimeline] = useState({});

  const addCheckedDay = (index) => {
    onChange();
    setCheckedDays((checkedDays) =>
      checkedDays.includes(index)
        ? checkedDays.filter((day) => day !== index)
        : [...checkedDays, index]
    );
  };

  const addJob = (day, indexTimeline) => {
    onChange();
    setJobs((jobs) => ({
      ...jobs,
      [day]: [
        ...(jobs[day] || []),
        {
          id: new Date().getTime(),
        },
      ],
    }));

    if (!checkedDays.includes(indexTimeline)) {
      setCheckedDays([...checkedDays, indexTimeline]);
    }
  };

  const removeJob = (day, id) => {
    onChange();
    setJobs((jobs) => ({
      ...jobs,
      [day]: jobs[day].filter((job) => job.id !== id),
    }));
  };

  return (
    <div className="sequence-page-schedule-component modal-body d-flex flex-column overflow-auto ml--0 mr--0 pl-0 pr-0">
      <div className="header-schedule">
        <div className="d-flex">
          <div style={{ width: 180 }}></div>
          <div
            className="flex-fill d-flex justify-content-between"
            style={{ width: 924, maxWidth: 924, margin: "0 -12px" }}
          >
            {Array(25)
              .fill()
              .map((_, i) => (
                <div key={i} style={{ width: 24, textAlign: "center" }}>
                  {i}
                </div>
              ))}
          </div>
          <div style={{ width: 100 }}></div>
        </div>
      </div>
      <div className="body-schedule overflow1-auto">
        {days.map((day, index) => (
          <div className="row-schedule" key={day.name}>
            <div style={{ width: 180 }} onClick={() => addCheckedDay(index)}>
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
              className={`timeline  ${
                checkedDays.includes(index) ? "active" : ""
              }`}
              style={{ width: 900, maxWidth: 900, minWidth: 900 }}
            >
              <SequenceTimeline
                disabled={!checkedDays.includes(index)}
                jobs={jobs[day.name] || []}
                setJobs={(editedJobs) =>
                  setJobs({ ...jobs, [day.name]: editedJobs })
                }
                onRemoveJob={(id) => removeJob(day.name, id)}
                onFullTimeline={(isFull) =>
                  setIsFullTimeline({ ...isFullTimeline, [day.name]: isFull })
                }
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
                onClick={() => addJob(day.name, index)}
                disabled={isFullTimeline[day.name]}
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
