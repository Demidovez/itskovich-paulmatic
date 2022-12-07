import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Table } from "reactstrap";
import { addContactId } from "store/slices/contactsSlice";
import "./TableSequenceContacts.scss";

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
      width: "25%",
      minWidth: "170px",
      maxWidth: "800px",
    },
  },
  {
    label: "Фамилия",
    name: "LastName",
    style: {
      width: "25%",
      minWidth: "170px",
      maxWidth: "800px",
    },
  },
  {
    label: "E-mail",
    name: "Email",
    style: {
      width: "40%",
      minWidth: "250px",
      maxWidth: "800px",
    },
  },
  {
    label: "Статус",
    name: "Status",
    style: {
      width: "22%",
      minWidth: "100px",
      maxWidth: "800px",
    },
  },
  {
    label: "Доставлено",
    name: "Delivered",
    style: {
      width: "20%",
      minWidth: "100px",
      maxWidth: "800px",
    },
  },
  {
    label: "Открыто",
    name: "Opened",
    style: {
      width: "15%",
      minWidth: "80px",
      maxWidth: "800px",
    },
  },
  {
    label: "Ответил",
    name: "Replied",
    style: {
      width: "15%",
      minWidth: "80px",
      maxWidth: "800px",
    },
  },
  {
    label: "Текущий шаг",
    name: "StepIndex",
    style: {
      width: "37%",
      minWidth: "100px",
      maxWidth: "800px",
    },
  },
];

const STATS_STYLE = {
  Approaching: {},
  Replied: {
    color: "white",
    background: "green",
  },
  Opened: {
    color: "white",
    background: "#0099ff",
  },
  Bounce: {
    color: "white",
    background: "#8f0000",
  },
};

const TableSequenceContacts = ({
  data = { Items: [] },
  selectedIds,
  fillHeader = true,
  onSelect = () => {},
  // isSelectedAll = false,
}) => {
  const [fields] = useState(DEFAULT_FIELDS);

  return (
    <div className="table-sequence-contacts flex-fill1 h-100 overflow-auto pt-3">
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
                key={contact.Contact.id}
                className={`d-flex`}
                onClick={() => onSelect(contact.Contact.id)}
              >
                {fields.map((field) => {
                  if (field.name === "checkbox") {
                    return (
                      <td
                        className="p-0 d-flex justify-content-center align-items-center"
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
                            checked={selectedIds.includes(contact.Contact.id)}
                            onChange={() => onSelect(contact.Contact.id)}
                            id={"seqcont_" + contact.Contact.id}
                            type="checkbox"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor={"seqcont_" + contact.Contact.id}
                          ></Label>
                        </div>
                      </td>
                    );
                  } else if (field.name === "FirstName") {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {contact.Contact.FirstName}
                      </td>
                    );
                  } else if (field.name === "LastName") {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {contact.Contact.LastName}
                      </td>
                    );
                  } else if (field.name === "Email") {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {contact.Contact.Email}
                      </td>
                    );
                  } else if (field.name === "Status") {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        <span
                          style={{
                            borderRadius: 10,
                            padding: "3px 8px",
                            fontSize: 12,
                            ...STATS_STYLE[contact.Status.Name],
                          }}
                        >
                          {contact.Status.Name}
                        </span>
                      </td>
                    );
                  } else if (
                    ["Delivered", "Opened", "Replied"].includes(field.name)
                  ) {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {contact.Stats[field.name]}
                      </td>
                    );
                  } else if (field.name === "StepIndex") {
                    return (
                      <td
                        key={field.name}
                        style={{
                          whiteSpace: "normal",
                          ...field.style,
                        }}
                      >
                        {1 + contact.StepIndex}
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

export default TableSequenceContacts;
// export default React.memo(TableSequenceContacts);
