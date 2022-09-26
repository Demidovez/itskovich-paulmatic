import { useRef } from "react";
import { Button } from "reactstrap";
import { useUploadFileOfContactsMutation } from "store/api/contacts";

const UploadContacts = (props) => {
  const inputFile = useRef(null);

  const [uploadFile] = useUploadFileOfContactsMutation();

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onInputFile = (e) => {
    const formData = new FormData();
    formData.append("f", e.target.files[0]);

    uploadFile(formData);
  };

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept=".csv"
        style={{ display: "none" }}
        onChange={onInputFile}
      />
      <Button color="primary" onClick={onButtonClick}>
        Загрузить
      </Button>
    </>
  );
};

export default UploadContacts;
