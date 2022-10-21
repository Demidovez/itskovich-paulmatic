import EmailForm from "components/EmailForm/EmailForm";
import EmailIcon from "components/EmailIcon/EmailIcon";
import useYouSure from "hooks/useYouSure";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "reactstrap";
import "./ModalEmailSettings.scss";

const ModalEmailSettings = ({ onClose, status }) => {
  const [activeServer, setActiveServer] = useState({ id: "another" });
  const [isCanClose, setIsCanClose] = useState(false);
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const emailServers = useSelector(
    (state) => state.common.AccountSettings.EmailServers
  );

  const onSubmit = (values) => {
    console.log(values);
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
      style={{
        maxWidth: "1000px",
        width: "55%",
        minWidth: "700px",
        // padding: "0.5rem 0",
      }}
    >
      <div className="modal-header p-4">
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
      <div className="modal-body p-0">
        <div className="email-servers mt-0 ml-4 mr-4 mb-4">
          {emailServers.map((server) => (
            <div
              key={server.Creds.Id}
              className={activeServer.id === server.Creds.Id ? "active" : ""}
              onClick={() =>
                setActiveServer((old) => ({
                  ...old,
                  ...server,
                  id: server.Creds.Id,
                }))
              }
            >
              <EmailIcon id={server.Creds.Id} />
              <span className="email-label">{server.Creds.Name}</span>
            </div>
          ))}
          <div className="email-separator" />
          {emailServers.length ? (
            <div
              className={activeServer.id === "another" ? "active" : ""}
              onClick={() =>
                setActiveServer((old) => ({
                  ...old,
                  SmtpHost: "",
                  ImapHost: "",
                  Login: "",
                  Password: "",
                  SmtpPort: "",
                  ImapPort: "",
                  id: "another",
                }))
              }
            >
              <EmailIcon id="another" />
              <span className="email-label">Другое</span>
            </div>
          ) : null}
        </div>
        <EmailForm
          isChange={status === "change"}
          className="p-4"
          onSubmit={onSubmit}
          onClose={tryForceClose}
          server={activeServer}
        />
      </div>
    </Modal>
  );
};

export default ModalEmailSettings;
