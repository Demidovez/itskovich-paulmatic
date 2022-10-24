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
    name: "name",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Компания",
    name: "company",
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
    name: "email",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Телефон",
    name: "phone",
    style: {
      width: "13%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "LinkedIn",
    name: "linkedin",
    style: {
      width: "23%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Последовательность",
    name: "sequence",
    style: {
      width: "14%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
];

const TableContacts = ({
  onSelect,
  data = { Items: [] },
  selectedIds,
  columns,
}) => {
  const [fields, setFields] = useState([]);

  const dispatch = useDispatch();

  const onSelectContact = (id) => {
    dispatch(addContactId(id));
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
    <div
      className="table-contacts flex-fill"
      style={{ overflow: "auto", height: 0 }}
    >
      {data.TotalCount === 0 ? (
        <p className="message">
          Контактов пока нет
          <br />
          Добавьте контакты вручную или загрузите файл
        </p>
      ) : (
        <Table
          className="align-items-center table-flush table-hover fixed-header"
          responsive
        >
          <thead className="thead-light sticky-top" style={{ zIndex: 999 }}>
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
                  } else if (field.name === "linkedin") {
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
                  } else if (["phone"].includes(field.name)) {
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
                  } else if (["sequence"].includes(field.name)) {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        Основная
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
      )}
    </div>
  );
};

export default React.memo(TableContacts);
// export default TableContacts;
