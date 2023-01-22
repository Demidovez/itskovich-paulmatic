import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';

import { setSearchValue } from '~src/store/slices/b2bFilterSlice';

const SearchBar = ({ table, className }) => {
  const search = useSelector((state) => state.filter.search[table]);
  const dispatch = useDispatch();

  const [ isTyping, setIsTyping ] = useState(false);
  const [ value, setValue ] = useState(search || null);

  useEffect(() => {
    setValue(search);
  }, [search]);

  const onChange = ({ target }) => {
    setValue(target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    if (value === null || isTyping === false) return;

    // if (value.length < 4) return;

    const idTimer = setTimeout(() => {
      setIsTyping(false);
      onSearch(value);
    }, 200);

    return () => {
      clearTimeout(idTimer);
    };
  }, [ value, isTyping ]);

  const onSearch = (searchStr) => {
    dispatch(setSearchValue({ filter: table, search: searchStr }));
  };

  return (
    <div
      className={`${className} d-flex justify-content-end align-items-center`}
    >
      <Input
        type="search"
        placeholder="Поиск..."
        value={value || ''}
        onChange={onChange}
      />
      <i className="fas fa-search ml-2"></i>
    </div>
  );
};

export default SearchBar;
