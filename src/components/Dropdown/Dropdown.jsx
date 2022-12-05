import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { cropText } from "utils/utils";

const DropdownCustom = ({
  items,
  fieldOfItem = "",
  isDisabled = false,
  color = "primary",
  className = "",
  outline = false,
  classNameButton = "",
  defaultValue = "",
  currentValue = null,
  maxLength = 1000,
  isFull = false,
  onSelect = () => {},
  style = {},
  // isTransparent = false,
}) => {
  const [value, setValue] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // useEffect(() => {
  //   currentValue && setValue(currentValue);
  // }, [currentValue]);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 100);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    value && onSelect(value);
  }, [value]);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      direction="down"
      color={color}
      style={{
        opacity: isDisabled ? 0.6 : 1,
        width: isFull ? "100%" : style.width || "auto",
      }}
      disabled={isDisabled}
      className={className}
    >
      <DropdownToggle
        caret
        outline={outline}
        color={color}
        style={{
          ...style,
          overflow: "hidden",
          width: isFull ? "100%" : style.width || "auto",
        }}
        className={`d-flex align-items-center justify-content-between ${classNameButton}`}
      >
        {currentValue === null
          ? cropText(
              (value && (fieldOfItem ? value[fieldOfItem] : value)) ||
                defaultValue,
              maxLength
            )
          : currentValue}
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
            {fieldOfItem ? item[fieldOfItem] : item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownCustom;
