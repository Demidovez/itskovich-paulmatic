import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Selector = ({ data, value, onSelect, isDisabled, dependValue }) => {
  const [variants, setVariants] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (data.Variants) {
      let variants = data.Variants;

      if (dependValue) {
        variants = variants
          .filter((variant) => variant.includes(`=${dependValue};`))
          .map((variant) => variant.replace(/(.*);(.*)/gi, "$2"));
      }

      setVariants(["Все", ...variants]);
    }
  }, [data.Variants, dependValue]);

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
        style={{ width: "100%", overflow: "hidden" }}
        className="d-flex align-items-center justify-content-between"
      >
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "inline-block",
            textOverflow: "ellipsis",
            width: "1000px",
            textAlign: "left",
          }}
        >
          {value || "Все"}
        </div>
      </DropdownToggle>
      <DropdownMenu
        style={{ minWidth: "100%", maxHeight: "60vh", overflow: "auto" }}
        right
      >
        {variants.map((variant, index) => (
          <DropdownItem
            key={index}
            onClick={() => onSelect(variant === "Все" ? "" : variant)}
          >
            {variant}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Selector;
