import { Table } from "reactstrap";
import "./TableContacts.scss";

const TableContacts = ({ onSelect, activeContactId, data = { Items: [] } }) => {
  return (
    <div className="table-contacts">
      <Table className="align-items-center table-flush table-hover" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Имя</th>
            <th scope="col">Email</th>
            <th scope="col">Телефон</th>
            <th scope="col">Компания</th>
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
              <td scope="row">
                <div className="d-flex align-items-center justify-content-center">
                  <input type="checkbox" />
                </div>
              </td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.company}</td>
              <td>{contact.linkedin}</td>
              <td>Основная</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data.length === 0 && (
        <p className="message">Добавьте контакты вручную или загрузите файл</p>
      )}
    </div>
  );
};

export default TableContacts;
