import pupa from "pupa";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";

const PreviewViewer = ({ subject = "", body = "", stubContact, account }) => {
  const [cleanSubject, setCleanSubject] = useState("");
  const [cleanBody, setCleanBody] = useState("");

  useEffect(() => {
    subject &&
      setCleanSubject(
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
              Object.entries(account).map(([k, v]) => [
                k[0].toUpperCase() + k.slice(1),
                v,
              ])
            ),
          },
        })
      );
  }, [subject]);

  useEffect(() => {
    body &&
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
              Object.entries(account).map(([k, v]) => [
                k[0].toUpperCase() + k.slice(1),
                v,
              ])
            ),
          },
        })
      );
  }, [body]);

  return (
    <>
      {cleanSubject ? (
        <div className="d-flex">
          <strong className="pr-2">Тема:</strong>
          <Input type="text" defaultValue={cleanSubject} />
        </div>
      ) : null}

      <EditorEmail
        content={
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
