import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
const {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} = require("reactstrap");

const DropdownWithIcon = ({
  color = "primary",
  label,
  icon,
  size = "lg",
  className,
  items = [],
  onSelect,
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

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      direction="down"
      className={`${className}`}
    >
      <DropdownToggle outline color={color} size={size}>
        <div className="d-flex align-items-center">
          {icon()}
          <span>{label}</span>
          <MdArrowDropDown size="1.5rem" className="ml-0" />
        </div>
      </DropdownToggle>
      <DropdownMenu style={{ opacity: isShow ? 1 : 0, minWidth: "100%" }}>
        {items.map((item, index) => (
          <DropdownItem key={index} onClick={() => onSelect(item)}>
            {typeof item === "object" ? item.label : item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownWithIcon;
