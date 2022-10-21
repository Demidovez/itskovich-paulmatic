import EmailForm from "components/EmailForm/EmailForm";
import EmailIcon from "components/EmailIcon/EmailIcon";
import useYouSure from "hooks/useYouSure";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "reactstrap";
import "./ModalEmailSettings.scss";

const ModalEmailSettings = ({ onClose }) => {
  const [activeServer, setActiveServer] = useState({
    Creds: {
      Id: "another",
    },
  });
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const emailServersDefault = useSelector(
    (state) => state.common.AccountSettings.EmailServers
  );
  const InMailSettings = useSelector(
    (state) => state.common.Account.InMailSettings
  );

  const [emailServers, setEmailServers] = useState([]);

  useState(() => {
    if (InMailSettings) {
      setEmailServers(
        emailServersDefault.map((server) =>
          server.Creds.Id === InMailSettings.Creds.Id ? InMailSettings : server
        )
      );
      setActiveServer(InMailSettings);
    }
  }, [InMailSettings, emailServersDefault]);

  useEffect(() => {
    if (InMailSettings === null) {
      setIsChanged(true);
    }
  }, [InMailSettings]);

  return (
    <Modal
      className="modal-email-settings-component modal-dialog-centered"
      toggle={tryClose}
      isOpen={true}
      backdrop={InMailSettings ? true : "static"}
      style={{
        maxWidth: "1000px",
        width: "55%",
        minWidth: "700px",
      }}
    >
      <div className="modal-header p-4">
        <h5 className="modal-title" id="exampleModalLabel">
          Настройка почты для работы
        </h5>
        {InMailSettings ? (
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={tryClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        ) : null}
      </div>
      <div className="modal-body p-0">
        <div className="email-servers mt-0 ml-4 mr-4 mb-4">
          {emailServers.map((server) => (
            <div
              key={server.Creds.Id}
              className={
                activeServer.Creds.Id === server.Creds.Id ? "active" : ""
              }
              onClick={() =>
                setActiveServer((old) => ({
                  ...old,
                  ...server,
                  Creds: server.Creds,
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
              className={activeServer.Creds.Id === "another" ? "active" : ""}
              onClick={() =>
                setActiveServer((old) => ({
                  ...old,
                  SmtpHost: "",
                  ImapHost: "",
                  Login: "",
                  Password: "",
                  SmtpPort: "",
                  ImapPort: "",
                  Creds: {
                    Id: "another",
                  },
                }))
              }
            >
              <EmailIcon id="another" />
              <span className="email-label">Другое</span>
            </div>
          ) : null}
        </div>
        <EmailForm
          isChange={InMailSettings !== null}
          className="p-4"
          onClose={tryForceClose}
          server={activeServer}
          onChange={() => setIsChanged(true)}
        />
      </div>
    </Modal>
  );
};

export default ModalEmailSettings;
