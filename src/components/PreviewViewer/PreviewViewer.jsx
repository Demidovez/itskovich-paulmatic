import pupa from "pupa";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";

const PreviewViewer = ({
  subject = "",
  body = "",
  stubContact,
  account = {},
}) => {
  const [cleanSubject, setCleanSubject] = useState("");
  const [cleanBody, setCleanBody] = useState("");

  console.log(account);

  useEffect(() => {
    setCleanSubject(
      pupa((subject || "").replaceAll("{{.", "{{"), {
        Contact: {
          ...Object.fromEntries(
            Object.entries(stubContact).map(([k, v]) => [
              k[0].toUpperCase() + k.slice(1),
              v,
            ])
          ),
        },
        Me: {
          ...Object.fromEntries(
            Object.entries(account.Contact).map(([k, v]) => [
              k[0].toUpperCase() + k.slice(1),
              v,
            ])
          ),
        },
        Sequence: {
          Sendings: 0,
          Views: 0,
        },
      })
    );
  }, [subject]);

  useEffect(() => {
    setCleanBody(
      pupa((body || "").replaceAll("{{.", "{{"), {
        Contact: {
          ...Object.fromEntries(
            Object.entries(stubContact).map(([k, v]) => [
              k[0].toUpperCase() + k.slice(1),
              v,
            ])
          ),
        },
        Me: {
          ...Object.fromEntries(
            Object.entries(account.Contact).map(([k, v]) => [
              k[0].toUpperCase() + k.slice(1),
              v,
            ])
          ),
        },
        Sequence: {
          Sendings: 0,
          Views: 0,
        },
      })
    );
  }, [body]);

  return (
    <>
      {cleanSubject ? (
        <div className="d-flex pl-2 pr-2 align-items-center">
          <strong className="pr-2">Тема:</strong>
          <Input
            type="text"
            value={cleanSubject}
            style={{ color: "black", background: "transparent" }}
            className="border-0"
            onChange={() => {}}
            disabled={true}
          />
        </div>
      ) : null}

      <EditorEmail
        template={
          '<head><meta name="viewport" content="width=400, initial-scale=1.0"></head>' +
          cleanBody
        }
        style="body {margin: 0px; padding: 0 10px}"
        disabled={true}
        visibleToolbar={false}
      />
    </>
  );
};

export default PreviewViewer;
