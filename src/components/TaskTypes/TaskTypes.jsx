import "./TaskTypes.scss";
import { IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { BiFileBlank } from "react-icons/bi";

import { ImLinkedin } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";

const getIcon = (type) => {
  let Icon;
  let color;

  switch (type) {
    case "call":
      Icon = IoCall;
      color = "#59c474";
      break;
    case "linkedin":
      Icon = ImLinkedin;
      color = "#3f7fab";
      break;
    case "manual_email":
      Icon = MdEmail;
      color = "#2a58fc";
      break;
    case "telegram":
      Icon = FaTelegramPlane;
      color = "#2AABEE";
      break;
    case "whatsapp":
      Icon = BsWhatsapp;
      color = "#74e069";
      break;
    default:
      Icon = BiFileBlank;
      color = "gray";
  }

  return (
    <div style={{ background: color }}>
      <Icon size="1rem" color="white" />
    </div>
  );
};

const TaskTypes = ({ types, current, setCurrent }) => {
  // const [types, setTypes]

  return (
    <div className="task-types-component">
      {types.map((type) => (
        <div
          key={type.Creds.Name}
          onClick={() => setCurrent(type)}
          className={`type-icon ${
            current && current.Creds.Name === type.Creds.Name ? "active" : ""
          }`}
        >
          {getIcon(type.Creds.Name)}
        </div>
      ))}
    </div>
  );
};

export default TaskTypes;
