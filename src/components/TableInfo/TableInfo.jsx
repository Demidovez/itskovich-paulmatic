import "./TableInfo.scss";
import { Table, Label } from "reactstrap";
import HiddenTableCell from "components/HiddenTableCell/HiddenTableCell";
import { addSelectedId } from "store/slices/tablesSlice";
import { useDispatch } from "react-redux";

const TableInfo = ({ data, fields = [], table, selectedIds = [] }) => {
  const dispatch = useDispatch();

  const onSelectId = (id) => {
    dispatch(addSelectedId({ table, id }));
  };

  // console.log(data);

  return (
    <div
      className="table-info-component flex-fill"
      style={{ overflow: "auto", height: 0 }}
    >
      {data && (
        <Table className="align-items-center table-flush table-hover fixed-header">
          <thead className="thead-light">
            <tr>
              {fields.map((field) => (
                <th scope="col" key={field.name + "1"}>
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((company) => (
              <tr key={company.id}>
                {fields.map((field, index) => {
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
                    );
                  } else if (field.name === "PhoneXX") {
                    return (
                      <td key={field.name}>
                        {company[field.name]
                          .trim()
                          .split(";")
                          .map((phoneItem, index) => (
                            <small key={index}>
                              <p
                                className={"ellipsized"}
                                style={{
                                  fontSize: "small",
                                  marginBottom: 0,
                                }}
                              >
                                {phoneItem.trim()}
                              </p>
                            </small>
                          ))}
                      </td>
                    );
                  } else if (
                    field.name === "Socials" ||
                    field.name === "Website"
                  ) {
                    return (
                      <td key={field.name}>
                        {company[field.name]
                          .trim()
                          .split(",")
                          .map((socialItem, index) => (
                            <small key={index}>
                              <p
                                className={"ellipsized"}
                                style={{
                                  fontSize: "small",
                                  marginBottom: 0,
                                }}
                              >
                                <a href={socialItem.trim()} target="_blank">
                                  {socialItem.trim()}
                                </a>
                              </p>
                            </small>
                          ))}
                      </td>
                    );
                  } else if (field.name === "Linkedin") {
                    return (
                      <td
                        key={field.name}
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
      )}

      {data && data.length === 0 && <p className="message">Не найдено :(</p>}
    </div>
  );
};

export default TableInfo;
