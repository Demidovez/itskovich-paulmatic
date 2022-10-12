import pupa from "pupa";
import EditorEmail from "components/EditorEmail/EditorEmail";

const PreviewViewer = ({ body, stubContact, account }) => {
  return (
    <EditorEmail
      content={
        '<head><meta name="viewport" content="width=400, initial-scale=1.0"></head>' +
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
      }
      style="body {margin: 0px; padding: 0 10px}"
      disabled={true}
      visibleToolbar={false}
    />
  );
};

export default PreviewViewer;
