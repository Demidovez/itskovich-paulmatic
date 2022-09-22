// import { Table } from "reactstrap";
import "./TableInfo.scss";
import { Table, Label } from "reactstrap";
import HiddenTableCell from "components/HiddenTableCell/HiddenTableCell";
import { addSelectedId } from "store/slices/tablesSlice";
import { useDispatch } from "react-redux";

const TableInfo = ({ data = [], fields = [], table, selectedIds }) => {
  const dispatch = useDispatch();

  const onSelectId = (id) => {
    dispatch(addSelectedId({ table, id }));
  };

  return (
    <div
      className="table-info-component flex-fill"
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
                    <td scope="row" className="p-0" key={field.name}>
                      <div className="custom-control checkbox-contact custom-checkbox ">
                        <input
                          className="custom-control-input"
                          checked={selectedIds.includes(company.id)}
                          onChange={() => onSelectId(company.id)}
                          id={"check_" + company.id}
                          type="checkbox"
                        />
                        <Label
                          className="custom-control-label"
                          htmlFor={"check_" + company.id}
                        ></Label>
                      </div>
                    </td>
                    // <td scope="row" key={field.name}>
                    //   <div className="d-flex align-items-center justify-content-center">
                    //     <input type="checkbox" />
                    //   </div>
                    // </td>
                  );
                } else if (field.name === "Linkedin") {
                  return (
                    <td
                      key={company[field.name]}
                      style={{
                        maxWidth: 350,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      <a href={company[field.name]} target="_blank">
                        {company[field.name]}
                      </a>
                    </td>
                  );
                } else if (["Email", "Phone"].includes(field.name)) {
                  return (
                    <HiddenTableCell
                      key={field.name}
                      value={company[field.name]}
                    />
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

export default TableInfo;
