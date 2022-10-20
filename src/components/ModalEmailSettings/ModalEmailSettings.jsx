import EmailIcon from "components/EmailIcon/EmailIcon";
import useYouSure from "hooks/useYouSure";
import { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import "./ModalEmailSettings.scss";

const ModalEmailSettings = ({ onClose, status }) => {
  const [isCanClose, setIsCanClose] = useState(false);
  const [emailServers, setEmailServers] = useState([
    {
      SntpHost: "smtp.mail.ru",
      InapHost: "imap.mail.com",
      SmtpPort: 993,
      InapPort: 466,
      Name: "Mail.ru",
    },
    {
      SmtpHost: "smtp.gmail.ru",
      ImapHost: "inap-gnail.com",
      SmtpPort: 993,
      ImapPort: 466,
      Name: "Gmail",
    },
    {
      SmtpHost: "smtp.yandex.ru",
      ImapHost: "inap-gnail.com",
      SmtpPort: 993,
      ImapPort: 466,
      Name: "Yandex",
    },
    {
      SmtpHost: "smtp.gmail.ru",
      ImapHost: "inap-gnail.com",
      SmtpPort: 993,
      ImapPort: 466,
      Name: "Outlook",
    },
  ]);

  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const testAndSave = () => {
    setIsCanClose(true);
  };

  useEffect(() => {
    isCanClose && tryForceClose();
  }, [isCanClose, tryForceClose]);

  useEffect(() => {
    if (status === "none") {
      setIsChanged(true);
    }
  }, [status, setIsChanged]);

  return (
    <Modal
      className="modal-email-settings-component modal-dialog-centered"
      toggle={tryClose}
      isOpen={true}
      backdrop={status === "none" ? "static" : true}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Настройка почты для работы
        </h5>
        {status === "none" ? null : (
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={tryClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        )}
      </div>
      <div className="modal-body">
        <div className="email-servers">
          {emailServers.map((server) => (
            <div key={server.Name}>
              {/* <EmailIcon name={server.Name} /> */}
              <span>{server.Name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-footer">
        {status === "change" && (
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={tryClose}
          >
            Отмена
          </Button>
        )}
        <Button color="primary" type="button" onClick={testAndSave}>
          Тест и сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEmailSettings;
