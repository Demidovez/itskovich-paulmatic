import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownCustom = ({
  items,
  isDisabled = false,
  color = "primary",
  className = "",
  outline = false,
}) => {
  const [value, setValue] = useState("Папка");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 0);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      direction="down"
      color={color}
      style={{
        opacity: isDisabled ? 0.6 : 1,
      }}
      disabled={isDisabled}
      className={className}
    >
      <DropdownToggle
        caret
        outline={outline}
        color={color}
        style={{ overflow: "hidden" }}
        className="d-flex align-items-center justify-content-between"
      >
        {value}
      </DropdownToggle>

      <DropdownMenu
        style={{
          maxHeight: "200px",
          overflow: "auto",
          minWidth: "100%",
          opacity: isShow ? 1 : 0,
        }}
        right
      >
        {items.map((item, index) => (
          <DropdownItem key={index} onClick={() => setValue(item)}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownCustom;
