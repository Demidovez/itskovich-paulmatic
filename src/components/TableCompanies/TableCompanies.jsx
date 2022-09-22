// import { Table } from "reactstrap";
import "./TableCompanies.scss";
import { Table } from "reactstrap";

const TableCompanies = ({ data = [], fields = [] }) => {
  // console.log(data);
  return (
    <div
      className="table-companies flex-fill"
      style={{ overflow: "auto", height: "100px" }}
    >
      <Table className="align-items-center table-flush table-hover fixed-header">
        <thead className="thead-light">
          <tr>
            {fields.map((field) => (
              <th scope="col" key={field.name}>
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((company) => (
            <tr key={company.id}>
              {fields.map((field) => {
                if (field.name === "checkbox") {
                  return (
                    <td scope="row" key={field.name}>
                      <div className="d-flex align-items-center justify-content-center">
                        <input type="checkbox" />
                      </div>
                    </td>
                  );
                } else {
                  return <td key={field.name}>{company[field.name]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      {data.length === 0 && <p className="message">Не найдено :(</p>}
    </div>
  );
};

export default TableCompanies;
