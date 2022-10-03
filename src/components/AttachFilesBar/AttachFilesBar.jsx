import { useRef, useState } from "react";
import { Badge, Button } from "reactstrap";
import { TbPaperclip } from "react-icons/tb";
import "./AttachFilesBar.scss";

const AttachFilesBar = ({ onFileAttached, onFileDeattach }) => {
  const [files, setFiles] = useState([]);
  const inputFile = useRef(null);

  const onInputFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFiles((files) => [...files, file]);
      onFileAttached(file);
    }
  };

  const onUploadFile = () => {
    inputFile.current.click();
  };

  const onClickOnFile = (lastModified) => {
    onFileDeattach(lastModified);
    setFiles(files.filter((file) => file.lastModified !== lastModified));
  };

  return (
    <>
      <div className="attach-files-bar-component d-flex align-items-center">
        <div className="d-flex mr-4">
          {files.map((file) => (
            <Badge
              key={file.lastModified}
              className="attached-file ml-2"
              color="dark"
              pill
              onClick={() => onClickOnFile(file.lastModified)}
            >
              {file.name}
            </Badge>
          ))}
        </div>
        <Button
          className="btn-icon btn-3"
          color="info"
          type="button"
          size="sm"
          onClick={onUploadFile}
        >
          <TbPaperclip size="1rem" />
          <span className="">Прикрепить</span>
        </Button>
      </div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onInputFile}
      />
    </>
  );
};

export default AttachFilesBar;
