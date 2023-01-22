import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  Row,
} from 'reactstrap';

import useYouSure from '~src/hooks/useYouSure';

const ModalContactForm = ({ contact, isShow, onSave, onRemove, onClose }) => {
  const [ currentContact, setCurrentContact ] = useState(contact || {});
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  useEffect(() => {
    setCurrentContact(contact || {});
  }, [contact]);

  const handleSave = () => {
    onSave(currentContact);
    setCurrentContact({});
    setIsChanged(false);
  };

  const handleRemove = () => {
    onRemove(currentContact.id);
    setCurrentContact({});
    setIsChanged(false);
  };

  const onInputChange = ({ target }, field) => {
    setCurrentContact({ ...currentContact, [field]: target.value });
    setIsChanged(true);
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isShow}
      toggle={tryClose}
      style={{
        maxWidth: '500px',
        width: '90%',
        minWidth: '200px',
        padding: '0.5rem 0',
      }}
    >
      <Card className={'shadow'} color="secondary">
        <CardHeader className="border-0 modal-header text-center pb-3">
          <h3 className="mb-0">{currentContact.name || 'Новый контакт'}</h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={tryClose}
            style={{ position: 'absolute', right: '1.25rem' }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </CardHeader>
        <CardBody>
          <Input
            className="mb-4"
            placeholder={'Имя'}
            value={currentContact.FirstName || ''}
            onChange={(e) => onInputChange(e, 'FirstName')}
          />
          <Input
            className="mb-4"
            placeholder={'Фамилия'}
            value={currentContact.LastName || ''}
            onChange={(e) => onInputChange(e, 'LastName')}
          />
          <Input
            className="mb-4"
            value={currentContact.Email || ''}
            placeholder={'Email'}
            onChange={(e) => onInputChange(e, 'Email')}
          />
          <Input
            className="mb-4"
            value={currentContact.Phone || ''}
            placeholder={'Телефон'}
            onChange={(e) => onInputChange(e, 'Phone')}
          />
          <Input
            className="mb-4"
            value={currentContact.Job || ''}
            placeholder={'Должность'}
            onChange={(e) => onInputChange(e, 'Job')}
          />
          <Input
            className="mb-4"
            value={currentContact.Company || ''}
            placeholder={'Компания'}
            onChange={(e) => onInputChange(e, 'Company')}
          />
          <Input
            className="mb-4"
            placeholder={'LinkedIn'}
            value={currentContact.Linkedin || ''}
            onChange={(e) => onInputChange(e, 'Linkedin')}
          />
          <Row>
            <div className="col">
              {contact && onRemove ? (
                <Button
                  color="danger"
                  className="w-100"
                  outline
                  onClick={handleRemove}
                >
                  Удалить
                </Button>
              ) : (
                <Button
                  color="danger"
                  className="w-100"
                  outline
                  onClick={tryForceClose}
                >
                  Отмена
                </Button>
              )}
            </div>
            <div className="col">
              <Button
                color="primary"
                className="w-100"
                onClick={handleSave}
                disabled={!currentContact.FirstName || !currentContact.Email}
              >
                {contact ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default ModalContactForm;
