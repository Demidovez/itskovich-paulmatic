import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { convertBase64 } from "utils/utils";

// if (file) {
//   setFiles((files) => [...files, file]);

//   // TODO: Запретить передавать SVG, это опасно.
//   if (file.type.includes("image")) {
//     convertBase64(file).then((base64) =>
//       onImageAttached({ id: file.lastModified, data: base64 })
//     );
//   }
// }

const EditorEmail = ({ className, files, content, onChange, disabled }) => {
  const [addedImagesId, setAdedImagesId] = useState([]);
  const data = useMemo(() => content, []);

  const editorRef = useRef(null);

  useEffect(() => {
    files.forEach((file) => {
      if (!file.type.includes("image")) return;

      if (!addedImagesId.includes(file.lastModified)) {
        convertBase64(file).then((base64) => {
          insertImageToEditor(base64);

          setAdedImagesId((ids) => [...ids, file.lastModified]);
        });
      }
    });
  }, [files.length]);

  const insertImageToEditor = (imageBase64) => {
    editorRef.current.execCommand("InsertImage", false, imageBase64);
  };

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={(content) => onChange(content)}
        initialValue={data}
        disabled={disabled}
        init={{
          height: "100%",
          statusbar: false,
          spellchecker_language: "ru",
          language: "ru",
          language_url: process.env.PUBLIC_URL + "/tinymce/langs/ru.js",
          visual: false,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
          ],
          toolbar:
            "undo redo blocks fontfamily fontsize " +
            "bold italic alignleft aligncenter " +
            "alignright alignjustify bullist numlist | forecolor " +
            "removeformat backcolor ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default EditorEmail;
