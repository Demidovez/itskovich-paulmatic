import { SiGmail, SiMaildotru } from "react-icons/si";
import { FaYandex, FaUserSecret } from "react-icons/fa";
import { MdOutlineMarkunreadMailbox, MdEmail } from "react-icons/md";
import { TbMail } from "react-icons/tb";
import { ReactComponent as Outlook } from "../../assets/img/icons/common/logo_outlook.svg";
import { ReactComponent as MicrosoftExchange } from "../../assets/img/icons/common/microsoft_exchange.svg";

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
    case "yop":
      Icon = () => <FaUserSecret />;
      break;
    case "ra":
      Icon = () => <MdOutlineMarkunreadMailbox />;
      break;
    case "exchange":
      Icon = () => (
        <MicrosoftExchange
          style={{ width: 16, height: 16 }}
          fill="currentColor"
        />
      );
      break;
    case "outlook":
      Icon = () => (
        <Outlook style={{ width: 16, height: 16 }} fill="currentColor" />
      );
      break;
    case "another":
      Icon = () => <SiMaildotru />;
      break;
    default:
      Icon = () => <MdEmail />;
  }

  return <Icon />;
};

export default EmailIcon;
