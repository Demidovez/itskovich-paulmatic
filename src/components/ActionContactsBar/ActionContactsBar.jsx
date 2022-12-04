import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ActionContactsBar = ({
  onDelete,
  onAddToSequence,
  onExport,
  disabled,
}) => {
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
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle
          caret
          id="contactActionsToggler"
          className="btn btn-outline-primary"
        >
          Действия
        </DropdownToggle>
        <DropdownMenu right style={{ opacity: isShow ? 1 : 0 }}>
          <DropdownItem onClick={onDelete} disabled={disabled}>
            Удалить
          </DropdownItem>
          <DropdownItem onClick={onAddToSequence} disabled={disabled}>
            Добавить в последовательность
          </DropdownItem>
          <DropdownItem onClick={onExport}>
            Экспортировать в csv-файл
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ActionContactsBar;
