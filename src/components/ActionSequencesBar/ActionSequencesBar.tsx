import React, { useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import ModalYouSure from '~src/components/ModalYouSure/ModalYouSure';

const ActionSequencesBar = ({ onDelete, disabled }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ isShow, setIsShow ] = useState(false);
  const [ isAskSure, setIsAskSure ] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 0);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onDeleteSubmit = () => {
    setIsAskSure(false);
    setDropdownOpen(false);
    onDelete();
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      disabled={disabled}
      className="mr-0"
    >
      <DropdownToggle
        color="primary"
        outline
        className="mr-0 pr-2"
        disabled={disabled}
      >
        <div className="d-flex align-items-center ">
          <span>Действия</span>
          <MdArrowDropDown size="1.5rem" className="ml-0" />
        </div>
      </DropdownToggle>
      <DropdownMenu right style={{ opacity: isShow ? 1 : 0, minWidth: '100%' }}>
        <DropdownItem onClick={() => setIsAskSure(true)}>Удалить</DropdownItem>
      </DropdownMenu>
      <ModalYouSure
        isShow={isAskSure}
        title={'Удалить последовательность'}
        text={'Вы действительно хотите удалить выбранные последовательности?'}
        onAgree={onDeleteSubmit}
        onCancel={() => {
          setDropdownOpen(false);
          setIsAskSure(false);
        }}
      />
    </Dropdown>
  );
};

export default ActionSequencesBar;
