import { IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { BiFileBlank } from "react-icons/bi";

import { ImLinkedin } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";

const TypeIcon = ({
  type,
  size = "1rem",
  className = "",
  inverse = false,
  style = {},
}) => {
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
    case "auto_email":
    case "mail":
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
    <div
      style={{ background: inverse ? "none" : color, ...style }}
      className={`${className}`}
    >
      <Icon size={size} color={inverse ? color : "white"} />
    </div>
  );
};

export default TypeIcon;
