import { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'reactstrap';

import EmailForm from '~src/components/EmailForm/EmailForm';
import EmailIcon from '~src/components/EmailIcon/EmailIcon';
import useYouSure from '~src/hooks/useYouSure';

import './ModalEmailSettings.scss';

const ModalEmailSettings = ({ onClose }) => {
  const navigate = useNavigate();
  const [ activeServer, setActiveServer ] = useState({
    Creds: {
      Id: 'another',
    },
  });
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const emailServersDefault = useSelector(
    (state) => state.common.AccountSettings.EmailServers,
  );
  const InMailSettings = useSelector(
    (state) => state.common.Account.InMailSettings,
  );

  const [ emailServers, setEmailServers ] = useState([]);

  useEffect(() => {
    setEmailServers(
      [...emailServersDefault].map((server) =>
        server.Creds.Id === ((InMailSettings && InMailSettings.Creds) || {}).Id
          ? InMailSettings
          : server,
      ),
    );

    if (InMailSettings) {
      setActiveServer(
        (InMailSettings.Creds || {}).Id
          ? InMailSettings
          : {
            Creds: {
              Id: 'another',
            },
          },
      );
    }
  }, [ InMailSettings, emailServersDefault.length ]);

  useEffect(() => {
    if (InMailSettings === null) {
      setIsChanged(true);
    }
  }, [InMailSettings]);

  return (
    <Modal
      className="modal-email-settings-component modal-dialog-centered"
      modalClassName="d-flex"
      toggle={InMailSettings ? tryClose : () => {}}
      // toggle={tryClose}
      isOpen={true}
      backdrop={InMailSettings ? true : 'static'}
      style={{
        maxWidth: '90%',
        minWidth: '700px',
      }}
    >
      <div className="modal-header p-4 align-items-center">
        <div className="d-flex align-items-center">
          <h5 className="modal-title" id="exampleModalLabel">
            Настройка почты для работы
          </h5>
          {activeServer.Creds.Id === 'mailru' ? (
            <div className="warning">
              Для Mail.ru необходимо настроить пароль для внешнего приложения,
              <a
                href="https://help.mail.ru/mail/security/protection/external"
                target="_blank"
                style={{ paddingLeft: 4 }}
              >
                подробнее
              </a>
            </div>
          ) : null}
        </div>
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
        ) : (
          <div
            onClick={() => navigate('/auth/login')}
            className="change-account"
          >
            <BiLogOut size="1rem" />
            <span>Сменить аккаунт</span>
          </div>
        )}
      </div>
      <div className="modal-body p-0">
        <div className="email-servers mt-0 ml-4 mr-4 mb-4">
          {emailServers.map((server) => (
            <div
              key={server.Creds.Id}
              className={
                activeServer.Creds.Id === server.Creds.Id ? 'active' : ''
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
              className={activeServer.Creds.Id === 'another' ? 'active' : ''}
              onClick={() =>
                setActiveServer((old) => ({
                  ...old,
                  SmtpHost: '',
                  ImapHost: '',
                  Login: '',
                  Password: '',
                  SmtpPort: '',
                  ImapPort: '',
                  Creds: {
                    Id: 'another',
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
