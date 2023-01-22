import { useRef, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Input } from 'reactstrap';

import './SequencesSearchBar.scss';

const SequencesSearchBar = () => {
  const [ searchValue, setSearchValue ] = useState('');
  const [ isFocus, setIsFocus ] = useState(false);

  const innerRef = useRef();

  const onClick = () => {
    if (!isFocus) {
      setIsFocus(true);
      innerRef.current.focus();
    } else {
      !searchValue && setIsFocus(false);
    }
  };

  return (
    <div
      className={`sequences-search-bar-component ml-3 ${
        isFocus ? 'focus' : ''
      }`}
    >
      <Input
        type="search"
        placeholder="Поиск"
        className="form-controlh-100 p-0"
        innerRef={innerRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div onClick={onClick}>
        <MdOutlineSearch
          size="2rem"
          style={{ opacity: 0.5, cursor: 'pointer' }}
          className=""
        />
      </div>
    </div>
  );
};

export default SequencesSearchBar;
