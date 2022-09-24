import React from "react";
import { useDispatch } from "react-redux";
import { Label, Table } from "reactstrap";
import { addContactId } from "store/slices/contactsSlice";
import "./TableContacts.scss";

const TableContacts = ({
  onSelect,
  activeContactId,
  data = { Items: [], TotalCpunt: 0 },
  selectedIds,
}) => {
  const dispatch = useDispatch();

  const onSelectContact = (id) => {
    dispatch(addContactId(id));
  };

  return (
    <div
      className="table-contacts flex-fill"
      style={{ overflow: "auto", height: 0 }}
    >
      <Table
        className="align-items-center table-flush table-hover fixed-header flex-fill"
        responsive
      >
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Имя</th>
            <th scope="col">Компания</th>
            <th scope="col">Email</th>
            <th scope="col">Телефон</th>
            <th scope="col">Linkedin</th>
            <th scope="col">Последовательность</th>
          </tr>
        </thead>
        <tbody>
          {data.Items.map((contact) => (
            <tr
              key={contact.id}
              onClick={() => onSelect(contact.id)}
              className={activeContactId === contact.id ? "table-primary" : ""}
            >
              <td scope="row" className="p-0">
                <div className="custom-control checkbox-contact custom-checkbox ">
                  <input
                    className="custom-control-input"
                    checked={selectedIds.includes(contact.id)}
                    onChange={() => onSelectContact(contact.id)}
                    id={"check_" + contact.id}
                    type="checkbox"
                  />
                  <Label
                    className="custom-control-label"
                    htmlFor={"check_" + contact.id}
                  ></Label>
                </div>
              </td>
              <td>{contact.name}</td>
              <td>{contact.company}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td
                style={{
                  maxWidth: 350,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                <a href={contact.linkedin} target="_blank">
                  {contact.linkedin}
                </a>
              </td>
              <td>Основная</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data.TotalCpunt === 0 && (
        <p className="message">Добавьте контакты вручную или загрузите файл</p>
      )}
    </div>
  );
};

export default React.memo(TableContacts);
// export default TableContacts;
