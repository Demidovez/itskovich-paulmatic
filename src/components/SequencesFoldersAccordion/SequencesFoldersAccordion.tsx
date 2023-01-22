import { Fragment, useEffect, useState } from 'react';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineEdit,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Collapse } from 'reactstrap';

const SequencesFoldersAccordion = ({
  folders = [],
  className,
  onEdit,
  onSelect,
}) => {
  const selectedFolderId = useSelector(
    (state) => state.sequences.selectedFolderId,
  );
  const [ activeSequence, setActiveSequence ] = useState('');

  return (
    <div className={className}>
      <div
        onClick={() => onSelect(0)}
        className={`${
          selectedFolderId === 0 ? 'active' : ''
        } pt-1 folder all-sequences`}
      >
        Все
      </div>
      {folders.map((folder) => (
        <Fragment key={folder.id}>
          <div
            onClick={() => onSelect(folder.id)}
            className={`${
              selectedFolderId === folder.id ? 'active' : ''
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
              selectedFolderId === folder.id ? (
                <MdKeyboardArrowDown size="1.4rem" style={{ opacity: 0.7 }} />
              ) : (
                <MdKeyboardArrowRight size="1.4rem" style={{ opacity: 0.7 }} />
              )
            ) : null}
          </div>
          <Collapse isOpen={selectedFolderId === folder.id}>
            {(folder.sequences || []).map((sequence) => (
              <div
                key={sequence.name}
                className={`${
                  activeSequence === sequence.name ? 'active' : ''
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
