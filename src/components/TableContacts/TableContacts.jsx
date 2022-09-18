import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Input,
} from "reactstrap";

const TableContacts = ({ data = [] }) => {
  return (
    <Table className={`align-items-center table-flush table-hover`} responsive>
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
        {data.map((contact) => (
          <tr key={contact.id}>
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
  );
};

export default TableContacts;
