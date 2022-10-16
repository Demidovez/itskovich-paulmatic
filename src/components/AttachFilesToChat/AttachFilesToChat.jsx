import { useRef } from "react";
import { TbPaperclip } from "react-icons/tb";
import { Button } from "reactstrap";

const AttachFilesToChat = ({ className }) => {
  const inputFile = useRef(null);

  const onInputFile = (e) => {
    const file = e.target.files[0];
  };

  const onUploadFile = () => {
    inputFile.current.click();
  };

  return (
    <div className={`${className}`}>
      <Button
        onClick={onUploadFile}
        className="p-1 pr-2 d-flex align-items-center"
        size="sm"
      >
        <TbPaperclip size="1.1rem" />
        <span className="pl-0" style={{ fontSize: 12 }}>
          Прикрепить
        </span>
      </Button>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onInputFile}
      />
    </div>
  );
};

export default AttachFilesToChat;
