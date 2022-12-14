import { useEffect, useRef, useState } from "react";
import { TbPaperclip } from "react-icons/tb";
import { Badge, Button } from "reactstrap";
import { fileToBase64 } from "utils/utils";
import { toast } from "react-toastify";
import "./AttachFilesToChat.scss";

const AttachFilesToChat = ({
  className,
  onFileAttached,
  onFileDeattach,
  isEmpty,
}) => {
  const [files, setFiles] = useState([]);
  const inputFile = useRef(null);

  useEffect(() => {
    if (isEmpty) {
      setFiles([]);
    }
  }, [isEmpty]);

  console.log(files);

  const onInputFile = async (e) => {
    const file = e.target.files[0];

    if (file.size / 1024 / 1024 > 50) {
      toast.error(`Файл слишком большой! Максимум 50 МБ`);
    } else if (file) {
      const id = new Date().getTime();

      setFiles((files) => [...files, { id, file }]);

      onFileAttached({
        id,
        Name: file.name,
        MimeType: file.type,
        ContentBase64: await fileToBase64(file),
      });
    }

    e.target.value = "";
  };

  const onUploadFile = () => {
    inputFile.current.click();
  };

  const onClickOnFile = (id) => {
    onFileDeattach(id);
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className={`attach-files-to-chat-component d-flex ${className}`}>
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
      <div className="mr-4 d-flex flex-column justify-content-center">
        <div className="d-flex ">
          {files.map((file) => (
            <Badge
              key={file.id}
              className="attached-file ml-2"
              pill
              onClick={() => onClickOnFile(file.id)}
            >
              {file.file.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttachFilesToChat;
