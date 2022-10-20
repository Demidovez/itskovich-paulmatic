import { SiGmail } from "react-icons/si";

const EmailIcon = ({ name }) => {
  let Icon;

  switch (name) {
    case "Gmail":
      Icon = () => <SiGmail />;
      break;
    case "Mail.ru":
      Icon = () => <SiGmail />;
      break;
    case "Yandex":
      Icon = () => <SiGmail />;
      break;
    case "Outlook":
      Icon = () => <SiGmail />;
      break;
    default:
      Icon = () => <SiGmail />;
  }

  return Icon;
};

export default EmailIcon;
