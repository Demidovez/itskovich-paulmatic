import {
  ImLinkedin,
  ImFileEmpty,
  ImMobile,
  ImWhatsapp,
  ImTelegram,
} from "react-icons/im";
import { MdEmail } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

const TaskStartTime = ({ time }) => {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const today = moment().endOf("day");
    const yesterday = moment().add(-1, "day").endOf("day");

    if (moment(time) > yesterday) {
      setIsToday(true);
    }
  }, [time]);

  return (
    <div>
      {isToday ? moment(time).format("LT") : moment(time).format("DD.MM HH:mm")}
    </div>
  );
};

export default TaskStartTime;
