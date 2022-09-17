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

const TableContacts = (props) => {
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
        <tr>
          <td scope="row">
            <div className="d-flex align-items-center justify-content-center">
              <input type="checkbox" />
            </div>
          </td>
          <td>Алексей7777777</td>
          <td>kenda@gmail.com</td>
          <td>2323232323</td>
          <td>no company</td>
          <td>Gogoll</td>
          <td>Основная</td>
        </tr>
        <tr>
          <td scope="row">
            <div className="d-flex align-items-center justify-content-center">
              <input type="checkbox" />
            </div>
          </td>
          <td>Алексей7777777</td>
          <td>kenda@gmail.com</td>
          <td>2323232323</td>
          <td>no company</td>
          <td>Gogoll</td>
          <td>Основная</td>
        </tr>
        <tr>
          <td scope="row">
            <div className="d-flex align-items-center justify-content-center">
              <input type="checkbox" />
            </div>
          </td>
          <td>Алексей7777777</td>
          <td>kenda@gmail.com</td>
          <td>2323232323</td>
          <td>no company</td>
          <td>Gogoll</td>
          <td>Основная</td>
        </tr>
        <tr>
          <td scope="row">
            <div className="d-flex align-items-center justify-content-center">
              <input type="checkbox" />
            </div>
          </td>
          <td>Алексей7777777</td>
          <td>kenda@gmail.com</td>
          <td>2323232323</td>
          <td>no company</td>
          <td>Gogoll</td>
          <td>Основная</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableContacts;
