import { useState } from "react";

const {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} = require("reactstrap");

const TaskSort = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
      <DropdownToggle caret color="primary" size="sm">
        За сегодня
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>За сегодня</DropdownItem>
        <DropdownItem>За вчера</DropdownItem>
        <DropdownItem>За месяц</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TaskSort;
