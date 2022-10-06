import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const ActionContactsBar = ({ onDelete, onAddToSequence, disabled }) => {
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
    <div className="d-flex pr-3">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        direction="down"
        disabled={disabled}
      >
        <DropdownToggle
          caret
          id="contactActionsToggler"
          className="btn btn-outline-primary"
          disabled={disabled}
        >
          Действия
        </DropdownToggle>
        <DropdownMenu right style={{ opacity: isShow ? 1 : 0 }}>
          <DropdownItem onClick={onDelete}>Удалить</DropdownItem>
          <DropdownItem onClick={onAddToSequence}>
            Добавить в последовательность
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ActionContactsBar;
