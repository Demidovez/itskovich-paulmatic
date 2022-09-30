import { useRef, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useUploadFileOfContactsMutation } from "store/api/contacts";

const CreateContactsSelector = ({ onCreate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const inputFile = useRef(null);

  const [uploadFile] = useUploadFileOfContactsMutation();

  const onInputFile = (e) => {
    const formData = new FormData();
    formData.append("f", e.target.files[0]);

    uploadFile(formData);
  };

  const onUploadFile = () => {
    inputFile.current.click();
    toggle();
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
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="primary">
          Создать
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={onUploadFile}>Из CSV-файла</DropdownItem>
          <DropdownItem onClick={onCreate}>Вручную</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default CreateContactsSelector;
