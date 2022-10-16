import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { convertBase64 } from "utils/utils";

const EditorEmail = ({
  className,
  files = [],
  content,
  template = "",
  onChange = () => {},
  style = "",
  disabled = false,
  visibleToolbar = true,
  insertedVariable = "",
  toolbar = "",
  placeholder,
}) => {
  const [addedImagesId, setAdedImagesId] = useState([]);
  const data = useMemo(() => template || content, [template]);

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

  useEffect(() => {
    insertedVariable &&
      editorRef.current.execCommand(
        "mceInsertContent",
        false,
        `{{${insertedVariable}}}`
      );
  }, [insertedVariable]);

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
        // value={data}
        disabled={disabled}
        init={{
          height: "100%",
          statusbar: false,
          spellchecker_language: "ru",
          language: "ru",
          language_url: process.env.PUBLIC_URL + "/tinymce/langs/ru.js",
          visual: false,
          menubar: false,
          placeholder: placeholder ? `${placeholder}` : "",
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
          toolbar: visibleToolbar
            ? toolbar ||
              "undo redo | blocks fontfamily fontsize | " +
                "bold italic | alignleft aligncenter | " +
                "alignright alignjustify | bullist numlist | forecolor " +
                "removeformat backcolor "
            : false,
          content_style: `
            body { font-family:Helvetica,Arial,sans-serif; font-size:14px } 
            
            .mce-content-body:not([dir="rtl"])[data-mce-placeholder]:not(.mce-visualblocks)::before {
                left: 10px;
                opacity: 0.5;
                font-size: 16px;
            } 
            
            ${style}
          `,
        }}
      />
    </>
  );
};

export default EditorEmail;
