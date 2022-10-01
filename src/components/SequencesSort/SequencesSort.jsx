import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { MdSort, MdArrowDropDown } from "react-icons/md";

const SequencesSort = () => {
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

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mr-3">
      <DropdownToggle color="primary" outline className="mr-0">
        <div className="d-flex align-items-center">
          <MdSort size="1.5rem" />
          <span>Статусы</span>
          <MdArrowDropDown size="1.5rem" className="ml-0" />
        </div>
      </DropdownToggle>
      <DropdownMenu right style={{ opacity: isShow ? 1 : 0, minWidth: "100%" }}>
        <DropdownItem>Статусы</DropdownItem>
        <DropdownItem>Алфавит</DropdownItem>
        <DropdownItem>Дата создания</DropdownItem>
        <DropdownItem>Дата просмотра</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SequencesSort;
