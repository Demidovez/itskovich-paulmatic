import { Fragment, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiArrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  Row,
} from 'reactstrap';

import DropdownCustom from '~src/components/Dropdown/Dropdown';
import useYouSure from '~src/hooks/useYouSure';

import './ModalCSVColumns.scss';

const ModalCSVColumns = ({
  contact,
  isShow,
  onSave,
  onRemove,
  onClose,
  columns,
}) => {
  const [ currentContact, setCurrentContact ] = useState(contact || {});
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);
  const [ signedColumns, setSignedColumns ] = useState([]);

  const ContactsFields = useSelector((state) => state.common.Contacts.Fields);

  useEffect(() => {
    if (columns) {
      const result = columns.map((column, index) => {
        const columnName = ContactsFields.find(
          (field) => field.Id === column.ContactFieldId,
        ) || { Name: '' };

        return {
          id: index,
          field: column.FileField,
          desc: column.Example,
          column: columnName.Name,
          idColumn: columnName.Id,
          isRequired: false,
        };
      });

      setSignedColumns(result);
    }
  }, [columns]);

  useEffect(() => {
    setCurrentContact(contact || {});
  }, [contact]);

  const handleSave = () => {
    onSave(signedColumns);
    setIsChanged(false);
  };

  const onClearColumnName = (id) => {
    setSignedColumns((columns) =>
      columns.map((column) =>
        column.id === id ? { ...column, column: '' } : column,
      ),
    );
  };

  const onSetColumnName = (id, data) => {
    setSignedColumns((columns) =>
      columns.map((column) =>
        column.id === id
          ? { ...column, column: data.Name, idColumn: data.Id }
          : column,
      ),
    );
  };

  return (
    <Modal
      className="modal-csv-columns-component modal-dialog-centered"
      isOpen={isShow}
      toggle={tryClose}
      style={{
        maxWidth: '800px',
        width: '90%',
        minWidth: '200px',
        padding: '0.5rem 0',
      }}
    >
      <Card className={'shadow'}>
        <CardHeader className="border-0 modal-header text-center pb-0 pt-0">
          {/* <h3 className="mb-0">Поля CSV-файла</h3> */}
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={tryClose}
            style={{ position: 'absolute', right: '0.3rem', top: '0.3rem' }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </CardHeader>
        <CardBody className="columns">
          <div className="headers">
            <div className="left">
              <h5>Поля CSV-файла</h5>
            </div>
            <div className="right">
              <h5>Поля контакта</h5>
            </div>
          </div>
          <div>
            {signedColumns.map((column) => (
              <div key={column.id} className="column">
                <div className="left">
                  {column.field}
                  <span>{column.desc}</span>
                </div>
                <div className="arrow">
                  <HiArrowRight
                    size="1.3rem"
                    color={column.column ? '#00bd00' : ''}
                  />
                </div>
                <div className="right">
                  <DropdownCustom
                    items={ContactsFields}
                    fieldOfItem="Name"
                    isFull={true}
                    // isTransparent={true}
                    classNameButton="empty-dropdown"
                    // defaultValue={column.column}
                    currentValue={column.column}
                    onSelect={(data) => onSetColumnName(column.id, data)}
                  />
                  <AiOutlineDelete
                    size="1.5rem"
                    onClick={() => onClearColumnName(column.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div></div>
            <div>
              <Button
                color="danger"
                className="w1-100"
                outline
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button color="primary" className="w1-100" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default ModalCSVColumns;
