import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const ActionContactsBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex pr-3">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle caret className="btn btn-outline-primary">
          Действия
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Удалить</DropdownItem>
          <DropdownItem>Добавить в последовательность</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ActionContactsBar;