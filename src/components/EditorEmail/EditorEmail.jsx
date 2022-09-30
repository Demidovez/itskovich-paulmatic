import { useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorEmail = ({ className, style, content, onChange }) => {
  const data = useMemo(() => content, []);

  const editorRef = useRef(null);

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={(content) => onChange(content)}
        initialValue={data}
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
            "undo redo | blocks fontfamily fontsize | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "removeformat forecolor backcolor | charmap",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default EditorEmail;
