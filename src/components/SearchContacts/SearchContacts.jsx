import { useEffect, useState } from "react";
import { Input } from "reactstrap";

const SearchContacts = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  useEffect(() => {
    const idTimer = setTimeout(() => {
      console.log(value);
      onSearch(value);
    }, 300);

    return () => {
      clearTimeout(idTimer);
    };
  }, [value]);

  return (
    <div className="d-flex justify-content-end align-items-center">
      <Input
        type="search"
        placeholder="Поиск..."
        value={value}
        onChange={onChange}
      />
      <i className="fas fa-search ml-2"></i>
    </div>
  );
};

export default SearchContacts;
