import { Fragment, useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdOutlineEdit,
} from "react-icons/md";
import { Collapse } from "reactstrap";

const SequencesFoldersAccordion = ({ folders = [], className, onEdit }) => {
  const [activeFolder, setActiveFolder] = useState("");
  const [activeSequence, setActiveSequence] = useState("");

  const toggle = (id) => {
    if (activeFolder === id) {
      setActiveFolder("");
    } else {
      setActiveFolder(id);
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
        <Fragment key={folder.id}>
          <div
            onClick={() => toggle(folder.id)}
            className={`${
              activeFolder === folder.id ? "active" : ""
            } pt-2 folder d-flex align-items-center justify-content-between`}
          >
            <span className="folder-name">{folder.Name}</span>
            <span>
              <MdOutlineEdit
                size="1.2rem"
                onClick={() => onEdit(folder)}
                className="edit-folder"
              />
            </span>
            {(folder.sequences || []).length > 0 ? (
              activeFolder === folder.id ? (
                <MdKeyboardArrowDown size="1.4rem" style={{ opacity: 0.7 }} />
              ) : (
                <MdKeyboardArrowRight size="1.4rem" style={{ opacity: 0.7 }} />
              )
            ) : null}
          </div>
          <Collapse isOpen={activeFolder === folder.id}>
            {(folder.sequences || []).map((sequence) => (
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
        </Fragment>
      ))}
    </div>
  );
};

export default SequencesFoldersAccordion;
