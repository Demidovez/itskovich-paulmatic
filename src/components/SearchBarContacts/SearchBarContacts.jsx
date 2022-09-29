import { useEffect, useState } from "react";
import { Input } from "reactstrap";

const SearchBarContacts = ({ onSearch, search, className }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [value, setValue] = useState(search || null);

  const onChange = ({ target }) => {
    setValue(target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    if (value === null || isTyping === false) return;

    const idTimer = setTimeout(() => {
      setIsTyping(false);
      onSearch(value);
    }, 200);

    return () => {
      clearTimeout(idTimer);
    };
  }, [value, isTyping]);

  return (
    <div
      className={`${className} d-flex justify-content-end align-items-center`}
    >
      <Input
        type="search"
        placeholder="Поиск..."
        value={value || ""}
        onChange={onChange}
      />
      <i className="fas fa-search ml-2"></i>
    </div>
  );
};

export default SearchBarContacts;
