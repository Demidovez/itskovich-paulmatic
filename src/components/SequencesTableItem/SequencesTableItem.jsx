import { Progress } from "reactstrap";
import React, { useState } from "react";
import Checkbox from "components/Checkbox/Checkbox";
import { MdPersonOutline, MdOutlineEmail } from "react-icons/md";

const SequencesTableItem = ({ sequence, fields, isSelect, onSelect }) => {
  const [isStopped, setIsStopped] = useState(sequence.Stopped);
  const [sequenceToModal, setSequenceToModal] = useState(null);

  const onStopped = () => {
    setIsStopped(!isStopped);
  };

  const openModal = (task) => {
    setSequenceToModal(task);
  };

  const closeModal = () => {
    setSequenceToModal(null);
  };

  return (
    <>
      <tr
        key={sequence.id}
        className="d-flex"
        onClick={() => openModal(sequence)}
      >
        {fields.map((field) => {
          if (field.name === "checkbox") {
            return (
              <td
                className="d-flex align-items-center"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <Checkbox
                  key={field.name}
                  id={sequence.id}
                  checked={isSelect}
                  onChange={onSelect}
                />
              </td>
            );
          } else if (field.name === "Stopped") {
            return (
              <td
                className="d-flex align-items-center pl-1 pr-1"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <label
                  className="custom-toggle m-0"
                  style={{ transform: "scale(0.8)" }}
                >
                  <input
                    type="checkbox"
                    checked={!isStopped}
                    onChange={onStopped}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
              </td>
            );
          } else if (field.name === "Description") {
            return (
              <td
                key={field.name}
                className="p-3 d-flex align-items-center"
                style={{
                  ...field.style,
                  width: `calc(${field.style.width})`,
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: 14,
                    fontWeight: 100,
                    textOverflow: "ellipsis",
                    width: `calc(100%)`,
                  }}
                >
                  {sequence[field.name]}
                </div>
              </td>
            );
          } else if (field.name === "People") {
            return (
              <td
                className="d-flex align-items-center pl-3"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <div>
                  <MdPersonOutline
                    size="1.25rem"
                    style={{ opacity: 0.3, marginTop: "-2px" }}
                    className="mr-1"
                  />
                </div>
                {sequence[field.name]}
              </td>
            );
          } else if (["Open_rate", "Reply_rate"].includes(field.name)) {
            return (
              <td
                className="d-flex align-items-center pl-3"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <strong className="pr-1">{sequence[field.name]}%</strong> (0)
              </td>
            );
          } else if (field.name === "Progress") {
            return (
              <td
                className="d-flex align-items-center pl-3"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <Progress
                  max="1"
                  value={sequence[field.name]}
                  style={{
                    height: "8px",
                  }}
                />
              </td>
            );
          } else if (field.name === "Delivered") {
            return (
              <td
                className="d-flex align-items-center pl-3"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <MdOutlineEmail
                  size="1.25rem"
                  style={{ opacity: 0.3, marginTop: "-2px" }}
                  className="mr-1"
                />
                {sequence[field.name]}
              </td>
            );
          } else {
            return (
              <td
                key={field.name}
                className="p-3 d-flex align-items-center"
                style={{
                  ...field.style,
                  width: `calc(${field.style.width})`,
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: 15,
                    fontWeight: 400,
                    textOverflow: "ellipsis",
                    width: `calc(100%)`,
                  }}
                >
                  {sequence[field.name]}
                </div>
              </td>
            );
          }
        })}
      </tr>
    </>
  );
};

export default SequencesTableItem;
