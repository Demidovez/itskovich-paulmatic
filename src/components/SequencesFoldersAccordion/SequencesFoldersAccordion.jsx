import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { Collapse } from "reactstrap";

const SequencesFoldersAccordion = ({ folders, className }) => {
  const [activeFolder, setActiveFolder] = useState("");
  const [activeSequence, setActiveSequence] = useState("");

  const toggle = (name) => {
    if (activeFolder === name) {
      setActiveFolder("");
    } else {
      setActiveFolder(name);
    }
  };

  const selectAll = () => {
    setActiveFolder("");
    setActiveSequence("");
  };

  return (
    <div className={className}>
      <div
        onClick={selectAll}
        className={`${
          !activeSequence ? "active" : ""
        } pt-1 folder all-sequences`}
      >
        Все
      </div>
      {folders.map((folder) => (
        <>
          <div
            onClick={() => toggle(folder.name)}
            className={`${
              activeFolder === folder.name ? "active" : ""
            } pt-2 folder d-flex align-items-center justify-content-between`}
          >
            {folder.label}
            {activeFolder === folder.name ? (
              <MdKeyboardArrowDown size="1.4rem" style={{ opacity: 0.7 }} />
            ) : (
              <MdKeyboardArrowRight size="1.4rem" style={{ opacity: 0.7 }} />
            )}
          </div>
          <Collapse isOpen={activeFolder === folder.name}>
            {folder.sequences.map((sequence) => (
              <div
                key={sequence.name}
                className={`${
                  activeSequence === sequence.name ? "active" : ""
                } ml-3`}
                onClick={() => setActiveSequence(sequence.name)}
              >
                {sequence.label}
              </div>
            ))}
          </Collapse>
        </>
      ))}
    </div>
  );
};

export default SequencesFoldersAccordion;
