import SequencesFoldersAccordion from "components/SequencesFoldersAccordion/SequencesFoldersAccordion";
import { useEffect, useState } from "react";
import {
  MdOutlineAssignment,
  MdFolderOpen,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import {
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import "./SequencesFolders.scss";

const SequencesFolders = ({ isTest }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (isTest) {
      setFolders([
        {
          name: "metal",
          label: "Металлургия",
          sequences: [
            {
              name: "sequence_1",
              label: "Последовательность 1",
            },
            {
              name: "sequence_2",
              label: "Последовательность 2",
            },
            {
              name: "sequence_3",
              label: "Последовательность 3",
            },
            {
              name: "sequence_4",
              label: "Последовательность 4",
            },
          ],
        },
        {
          name: "another",
          label: "Другое",
          sequences: [
            {
              name: "sequence_11",
              label: "Другое 1",
            },
            {
              name: "sequence_22",
              label: "Другое 2",
            },
            {
              name: "sequence_33",
              label: "Другое 3",
            },
            {
              name: "sequence_44",
              label: "Другое 4",
            },
          ],
        },
      ]);
    } else {
      setFolders([]);
    }
  }, [isTest]);

  return (
    <div className="squences-folders-component">
      {folders.length === 0 && (
        <div
          className="d-flex flex-column align-items-center p-1"
          style={{ opacity: 0.7 }}
        >
          <MdOutlineAssignment size="3rem" />
          <p className="text-center">
            Папки позволят Вам легко организовать последовательности
          </p>
          <Button className="d-flex align-items-center" color="info" outline>
            <MdFolderOpen size="1.5rem" className="mr-1" />
            Создать папку
          </Button>
        </div>
      )}

      {folders.length > 0 && (
        <>
          <div className="d-flex align-items-center justify-content-between mb-4 create-folder">
            Папки <MdOutlineCreateNewFolder size="1.75rem" />
          </div>
          <SequencesFoldersAccordion folders={folders} className="folders" />
        </>
      )}
    </div>
  );
};

export default SequencesFolders;
