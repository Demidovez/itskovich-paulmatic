import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown, MdOutlineArchive } from 'react-icons/md';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const SequencesStatusesSelector = () => {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ isShow, setIsShow ] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 0);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="primary" outline className="mr-0">
        <div className="d-flex align-items-center">
          <MdOutlineArchive size="1.5rem" />
          <span>Все статусы</span>
          <MdArrowDropDown size="1.5rem" className="ml-0" />
        </div>
      </DropdownToggle>
      <DropdownMenu right style={{ opacity: isShow ? 1 : 0, minWidth: '100%' }}>
        <DropdownItem>Все статусы</DropdownItem>
        <DropdownItem>Новые</DropdownItem>
        <DropdownItem>Активные</DropdownItem>
        <DropdownItem>Остановленные</DropdownItem>
        <DropdownItem>Архивированные</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SequencesStatusesSelector;
