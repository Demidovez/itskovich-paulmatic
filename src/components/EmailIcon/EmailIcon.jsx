import { SiGmail, SiMaildotru } from "react-icons/si";
import { FaYandex } from "react-icons/fa";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";
import { TbMail } from "react-icons/tb";

const EmailIcon = ({ id }) => {
  let Icon;

  switch (id) {
    case "mailru":
      Icon = () => <TbMail />;
      break;
    case "gmail":
      Icon = () => <SiGmail />;
      break;
    case "ya":
      Icon = () => <FaYandex />;
      break;
    case "ra":
      Icon = () => <MdOutlineMarkunreadMailbox />;
      break;
    case "another":
      Icon = () => <SiMaildotru />;
      break;
    default:
      Icon = () => <SiGmail />;
  }

  return <Icon />;
};

export default EmailIcon;
