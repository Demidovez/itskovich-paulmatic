import AttachFilesToChat from "components/AttachFilesToChat/AttachFilesToChat";
import DropdownWithIcon from "components/DropdownWithIcon/DropdownWithIcon";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useState } from "react";
import { TbTemplate } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import pupa from "pupa";
import "./ChatEditor.scss";

const ChatEditor = ({ className, sendMessage, chat = {} }) => {
  const [message, setMessage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");
  const [tamplatesList, setTamplatesList] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const templates = useSelector((state) => state.common.Templates.Marketplace);
  const Account = useSelector((state) => state.common.Account);

  useEffect(() => {
    console.log(attachedFiles);
  }, [attachedFiles.length]);

  useEffect(() => {
    templates &&
      setTamplatesList(
        Object.entries(templates).map((template) => ({
          name: template[0],
          body: template[1],
        }))
      );
  }, [templates]);

  const onSendMessage = () => {
    sendMessage(
      message,
      attachedFiles.map(({ lastModified, ...rest }) => rest)
    );
    setAttachedFiles([]);
    setMessage("");
  };

  const selectAvtiveTemplate = (template) => {
    setActiveTemplate(
      pupa((template || "").replaceAll("{{.", "{{"), {
        Contact: {
          ...Object.fromEntries(
            Object.entries(chat.Contact).map(([k, v]) => [
              k[0].toUpperCase() + k.slice(1),
              v,
            ])
          ),
        },
        Me: {
          ...Object.fromEntries(
            Object.entries({ ...Account.Contact, ...Account }).map(([k, v]) => [
              k[0].toUpperCase() + k.slice(1),
              v,
            ])
          ),
          FullName: Account.fullName,
        },
        Sequence: {
          Sendings: 0,
          Views: 0,
        },
      })
    );
  };

  return (
    <>
      <div
        className={`chat-editor-component flex-fill d-flex flex-column pb-0 ${className}`}
      >
        <div
          className="mt-2 ml-3 mb-0 d-flex justify-content-between align-items-center"
          style={{ zIndex: 100 }}
        >
          <div className="d-flex">
            <DropdownWithIcon
                id="tmpl-chooser"
              label="Шаблон"
              icon={() => <TbTemplate size="1.1rem" />}
              size="sm"
              className="editor-btn mr-2"
              items={tamplatesList.map((template) => template.name)}
              onSelect={(name) => selectAvtiveTemplate(templates[name])}
            />
            <AttachFilesToChat
              className="editor-btn"
              isEmpty={attachedFiles.length === 0}
              onFileDeattach={(id) =>
                setAttachedFiles((files) =>
                  files.filter((file) => file.id !== id)
                )
              }
              onFileAttached={(file) =>
                setAttachedFiles((files) => [...files, file])
              }
            />
          </div>
          <Button
            color="primary"
            className="mr-2"
            onClick={onSendMessage}
            disabled={message.length === 0}
          >
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
    </>
  );
};

export default ChatEditor;
