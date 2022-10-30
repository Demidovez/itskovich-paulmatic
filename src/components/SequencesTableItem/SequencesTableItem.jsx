import { Progress } from "reactstrap";
import React, { useEffect, useState } from "react";
import Checkbox from "components/Checkbox/Checkbox";
import { MdPersonOutline, MdOutlineEmail } from "react-icons/md";
import {
  useStopSequencesMutation,
  useStartSequencesMutation,
} from "store/api/sequences";

const SequencesTableItem = ({ sequence, fields, isSelect, onSelect }) => {
  const [isStopped, setIsStopped] = useState(sequence.Stopped);
  const [sequenceToModal, setSequenceToModal] = useState(null);

  const [startSequences] = useStartSequencesMutation();
  const [stopSequences] = useStopSequencesMutation();

  useEffect(() => {
    setIsStopped(sequence.Stopped);
  }, [sequence.Stopped]);

  const onStopped = () => {
    setIsStopped(!isStopped);

    if (isStopped) {
      startSequences([sequence.id]);
    } else {
      stopSequences([sequence.id]);
    }
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
                  zIndex: 100,
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
                className="d-flex align-items-center pl-2 pr-0"
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
          } else if (["OpenRate", "BounceRate"].includes(field.name)) {
            return (
              <td
                className="d-flex align-items-center pl-3"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <strong className="pr-1">
                  {Math.round(sequence[field.name] * 100)}%
                </strong>{" "}
                (0)
              </td>
            );
          } else if (field.name === "ReplyRate") {
            return (
              <td
                className="d-flex align-items-center pl-3"
                key={field.name}
                style={{
                  ...field.style,
                }}
              >
                <strong className="pr-1">
                  {Math.round(sequence[field.name] * 100)}%
                </strong>
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
          } else if (field.name === "EmailSendingCount") {
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
                  style={{ opacity: 0.3 }}
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
