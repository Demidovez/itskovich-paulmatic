import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Selector = ({ data, onSelect, isDisabled }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      direction="down"
      color="primary"
      style={{ width: "100%", opacity: isDisabled ? 0.6 : 1 }}
      disabled={isDisabled}
    >
      <DropdownToggle
        caret
        color="primary"
        style={{ width: "100%" }}
        className="d-flex align-items-center justify-content-between"
      >
        {selectedValue || "Все"}
      </DropdownToggle>
      <DropdownMenu style={{ width: "100%" }}>
        {(data.Variants || []).map((variant, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(variant)}>
            {variant}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Selector;
