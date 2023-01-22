import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  ImFileEmpty,
  ImLinkedin,
  ImMobile,
  ImTelegram,
  ImWhatsapp,
} from 'react-icons/im';
import { MdEmail } from 'react-icons/md';

const TaskStartTime = ({ time }) => {
  const [ isToday, setIsToday ] = useState(false);

  useEffect(() => {
    const today = moment().endOf('day');
    const yesterday = moment().add(-1, 'day').endOf('day');

    if (moment(time) > yesterday) {
      setIsToday(true);
    }
  }, [time]);

  return (
    <div>
      {isToday ? moment(time).format('LT') : moment(time).format('DD.MM HH:mm')}
    </div>
  );
};

export default TaskStartTime;
