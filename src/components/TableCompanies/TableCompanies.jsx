import { Table } from "reactstrap";
import "./TableCompanies.scss";

const TableCompanies = ({ onSelect, activeContactId, data = [] }) => {
  return (
    <div className="table-companies">
      <Table className="align-items-center table-flush table-hover" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Адрес</th>
            <th scope="col">Категория</th>
            <th scope="col">Город</th>
            <th scope="col">Страна</th>
            <th scope="col">E-mail</th>
            <th scope="col">Название</th>
            <th scope="col">Телефон</th>
            <th scope="col">Регион</th>
            <th scope="col">Соц. сети</th>
            <th scope="col">Подкатегория</th>
            <th scope="col">Сайт</th>
            <th scope="col">Индекс</th>
          </tr>
        </thead>
        <tbody>
          {data.map((company) => (
            <tr
              key={company.id}
              onClick={() => onSelect(company.id)}
              className={activeContactId === company.id ? "table-primary" : ""}
            >
              <td scope="row">
                <div className="d-flex align-items-center justify-content-center">
                  <input type="checkbox" />
                </div>
              </td>
              <td>{company.Address}</td>
              <td>{company.Category}</td>
              <td>{company.City}</td>
              <td>{company.Country}</td>
              <td>{company.Email}</td>
              <td>{company.Name}</td>
              <td>{company.Phone}</td>
              <td>{company.Region}</td>
              <td>{company.Socials}</td>
              <td>{company.Subcategory}</td>
              <td>{company.Website}</td>
              <td>{company.ZipCode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data.length === 0 && <p className="message">Не найдено :(</p>}
    </div>
  );
};

export default TableCompanies;
