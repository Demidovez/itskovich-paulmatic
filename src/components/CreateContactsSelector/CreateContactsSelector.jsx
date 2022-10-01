import { useEffect, useRef, useState } from "react";
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
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 0);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

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
        <DropdownMenu right style={{ opacity: isShow ? 1 : 0 }}>
          <DropdownItem onClick={onUploadFile}>Из CSV-файла</DropdownItem>
          <DropdownItem onClick={onCreate}>Вручную</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default CreateContactsSelector;
