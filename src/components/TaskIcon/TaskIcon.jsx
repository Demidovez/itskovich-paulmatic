import {
  ImLinkedin,
  ImFileEmpty,
  ImMobile,
  ImWhatsapp,
  ImTelegram,
} from "react-icons/im";
import { MdEmail } from "react-icons/md";

const TaskIcon = ({ type, className }) => {
  let Icon;

  switch (type) {
    case "linkedin":
      Icon = () => <ImLinkedin color="#0077B5" />;
      break;
    case "call":
      Icon = () => <ImMobile color="#8E44AD" size="1.5rem" />;
      break;
    case "manual_email":
      Icon = () => <MdEmail color="#A0522D" size="1.5rem" />;
      break;
    case "whatsapp":
      Icon = () => <ImWhatsapp color="#008A00" size="1.5rem" />;
      break;
    case "telegram":
      Icon = () => <ImTelegram color="#1BA1E2" size="1.5rem" />;
      break;
    default:
      Icon = () => <ImFileEmpty color="#95A5A6" />;
  }

  return (
    <div className={`${className || "d-flex justify-content-center w-100"}`}>
      <Icon />
    </div>
  );
};

export default TaskIcon;
