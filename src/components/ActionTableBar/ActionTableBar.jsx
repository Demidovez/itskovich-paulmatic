import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const ActionTableBar = ({ onAddContact, onAddToSequence, disabled }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex pr-3">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        direction="down"
        disabled={disabled}
      >
        <DropdownToggle
          caret
          className="btn btn-outline-primary"
          disabled={disabled}
        >
          Действия
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={onAddContact}>
            Добавить в контакты
          </DropdownItem>
          <DropdownItem onClick={onAddToSequence}>
            Добавить в последовательность
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ActionTableBar;
