import { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import './DropdownIcon.scss';

const DropdownIcon = ({ className = '', items = [], onSelect }) => {
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
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      direction="down"
      className={`dropdown-icon-component ${className}`}
    >
      <DropdownToggle className="dropdown-icon">
        <span style={{ fontSize: 16 }}>{'{ }'}</span>
      </DropdownToggle>
      <DropdownMenu style={{ opacity: isShow ? 1 : 0, minWidth: '100%' }}>
        {items.map((item, index) => (
          <DropdownItem key={index} onClick={() => onSelect(item)}>
            {typeof item === 'object' ? item.label : item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownIcon;
