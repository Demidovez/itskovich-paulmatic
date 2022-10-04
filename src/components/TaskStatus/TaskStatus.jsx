import moment from "moment";
import { useEffect, useState } from "react";

const TaskStatus = ({ status, dueTime, color = "#525f7f" }) => {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const today = moment().endOf("day");
    const yesterday = moment().add(-1, "day").endOf("day");

    if (moment(dueTime) < today) {
      setIsToday(true);
    }
  }, [dueTime]);

  let text;
  let preffix = "";

  switch (status) {
    case "expired":
      text = "Просрочено"
      break;
    case "started":
      preffix = "Срок до";
      text = isToday
        ? moment(dueTime).format("LT")
        : moment(dueTime).format("DD.MM HH:mm");
      break;
    case "completed":
      text = "Выполнено";
      break;
    case "skipped":
      text = "Пропущено";
      break;
    default:
      text = status;
  }
  return (
    <div className="d-flex justify-content-end w-100" style={{ color }}>
      {preffix}
      <strong className="pl-1">{text}</strong>
    </div>
  );
};

export default TaskStatus;
