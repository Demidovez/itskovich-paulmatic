import { useRef } from "react";
import { Button } from "reactstrap";

const UploadContacts = (props) => {
  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept=".csv"
        style={{ display: "none" }}
      />
      <Button color="primary" onClick={onButtonClick}>
        Загрузить
      </Button>
    </>
  );
};

export default UploadContacts;
