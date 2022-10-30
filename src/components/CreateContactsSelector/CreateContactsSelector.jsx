import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  PopoverBody,
  UncontrolledPopover,
  UncontrolledTooltip,
} from "reactstrap";
import { useUploadFileOfContactsMutation } from "store/api/contacts";

const CreateContactsSelector = ({ onCreate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 0);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const inputFile = useRef(null);

  const [uploadFile, { isError, error }] = useUploadFileOfContactsMutation();

  useEffect(() => {
    if (isError && error) {
      toast.error("Ошибка загрузки");
    }
  }, [isError, error]);

  const onInputFile = (e) => {
    const formData = new FormData();
    formData.append("f", e.target.files[0]);

    uploadFile(formData);
  };

  const onUploadFile = () => {
    inputFile.current.click();
    toggle();
  };

  const popoverRef = useRef(null);

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
        <DropdownToggle caret color="primary" id="createContactToggler">
          Создать
        </DropdownToggle>
        <DropdownMenu right style={{ opacity: isShow ? 1 : 0 }}>
          <DropdownItem
            onClick={onUploadFile}
            onMouseEnter={() => {
              popoverRef.current.click();
            }}
            onMouseLeave={() => {
              popoverRef.current.click();
            }}
          >
            Из CSV-файла
          </DropdownItem>
          <div
            id="create_csv"
            ref={popoverRef}
            style={{ position: "relative", top: "-17px" }}
          />
          <UncontrolledPopover
            placement="left"
            target="create_csv"
            className="create_csv"
          >
            <div className="p-3" style={{ width: 700 }}>
              <p>Пример загружаемого файла:</p>
              <img
                src={require("../../assets/img/contacts_from_csv.jpg")}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </UncontrolledPopover>
          <DropdownItem onClick={onCreate}>Вручную</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default CreateContactsSelector;
