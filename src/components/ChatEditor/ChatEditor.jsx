import AttachFilesToChat from "components/AttachFilesToChat/AttachFilesToChat";
import DropdownWithIcon from "components/DropdownWithIcon/DropdownWithIcon";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useState } from "react";
import { TbTemplate } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import "./ChatEditor.scss";

const ChatEditor = ({ className }) => {
  const [message, setMessage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");
  const [tamplatesList, setTamplatesList] = useState([]);

  const templates = useSelector((state) => state.common.Templates.Marketplace);

  useEffect(() => {
    templates &&
      setTamplatesList(
        Object.entries(templates).map((template) => ({
          name: template[0],
          body: template[1],
        }))
      );
  }, [templates]);

  return (
    <div
      className={`chat-editor-component flex-fill d-flex flex-column pb-0 ${className}`}
    >
      <div
        className="mt-2 ml-3 mb-0 d-flex justify-content-between"
        style={{ zIndex: 100 }}
      >
        <div className="d-flex">
          <DropdownWithIcon
            label="Шаблон"
            icon={() => <TbTemplate size="1.1rem" />}
            size="sm"
            className="editor-btn mr-2"
            items={tamplatesList.map((template) => template.name)}
            onSelect={(name) => setActiveTemplate(templates[name])}
          />
          <AttachFilesToChat className="editor-btn" />
        </div>
        <Button color="primary" className="mr-2">
          Отправить
        </Button>
      </div>
      <div className="flex-fill">
        <EditorEmail
          content={message}
          template={activeTemplate}
          style="body {margin: 0px; padding: 0 10px}"
          onChange={(message) => setMessage(message)}
          placeholder="Введите сообщение..."
          toolbar="undo redo bold italic alignleft aligncenter alignright alignjustify bullist numlist fontsize forecolor backcolor | blocks fontfamily removeformat "
        />
      </div>
    </div>
  );
};

export default ChatEditor;
