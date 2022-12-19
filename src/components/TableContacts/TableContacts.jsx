import HiddenTableCell from "components/HiddenTableCell/HiddenTableCell";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Table } from "reactstrap";
import { addContactId } from "store/slices/contactsSlice";
import "./TableContacts.scss";

const DEFAULT_FIELDS = [
  {
    label: "",
    name: "checkbox",
    style: {
      width: "1%",
      minWidth: "60px",
      maxWidth: "60px",
    },
  },
  {
    label: "Имя",
    name: "FirstName",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Фамилия",
    name: "LastName",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Компания",
    name: "Сompany",
    style: {
      width: "20%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Должность",
    name: "Job",
    style: {
      width: "20%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "E-mail",
    name: "Email",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Телефон",
    name: "Phone",
    style: {
      width: "13%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "LinkedIn",
    name: "Linkedin",
    style: {
      width: "23%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Последовательность",
    name: "Sequences",
    style: {
      width: "15%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
];

const TableContacts = ({
  onSelect = () => {},
  onChecked,
  data = { Items: [] },
  selectedIds,
  columns,
  fillHeader = true,
}) => {
  const [fields, setFields] = useState([]);

  const dispatch = useDispatch();

  const onSelectContact = (id) => {
    if (onChecked) {
      onChecked(id);
    } else {
      dispatch(addContactId(id));
    }
  };

  useEffect(() => {
    if (columns) {
      setFields(
        DEFAULT_FIELDS.map((field) => {
          const userField = columns.find(
            (column) => column.name === field.name
          );

          if (userField) {
            return userField;
          } else {
            return field;
          }
        }).filter((field) => field.isDisabled !== true)
      );
    } else {
      setFields(DEFAULT_FIELDS.filter((field) => field.isDisabled !== true));
    }
  }, [columns]);

  return (
    <div className="overflow-hidden" style={{ flex: "0 1 auto" }}>
      <div
        className="table-contacts flex-fill1 h-100"
        // style={{ overflow: "auto", height: 0 }}
      >
        <Table
          className="align-items-center table-flush table-hover fixed-header"
          responsive
        >
          <thead
            className={`${
              fillHeader ? "thead-light" : "no-top-border"
            } sticky-top`}
            style={{ zIndex: 999 }}
          >
            <tr className="d-flex">
              {fields.map((field) => (
                <th key={field.name + "1"} style={field.style}>
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.Items.map((contact) => (
              <tr
                key={contact.id}
                className={`d-flex`}
                onClick={() => onSelect(contact.id)}
              >
                {fields.map((field) => {
                  if (field.name === "checkbox") {
                    return (
                      <td
                        className="p-0 pt-3"
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        <div
                          className="custom-control checkbox-contact custom-checkbox pl-0"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                    );
                  } else if (field.name === "Linkedin") {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        <a href={contact[field.name]} target="_blank">
                          {contact[field.name]}
                        </a>
                      </td>
                    );
                  } else if (["Phone"].includes(field.name)) {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {contact[field.name] &&
                          contact[field.name]
                            .trim()
                            .split(";")
                            .map((phone, index) => (
                              <div key={index}>{phone.trim()}</div>
                            ))}
                      </td>
                    );
                  } else if (["Sequences"].includes(field.name)) {
                    return (
                      <td
                        key={field.name}
                        className={"ellipsized"}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {/*{(contact[field.name] || [])*/}
                        {/*  .map(({ Name }) => Name)*/}
                        {/*  .join(", ")}*/}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {contact[field.name]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>
        {data.TotalCount === 0 ? (
          <p className="message">
            Контактов пока нет
            <br />
            Добавьте контакты вручную или загрузите файл
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(TableContacts);
// export default TableContacts;
