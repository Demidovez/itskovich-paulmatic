import { useEffect, useState } from "react";
import { Input } from "reactstrap";

const SearchContacts = ({ onSearch }) => {
  const [value, setValue] = useState(null);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  useEffect(() => {
    if (value === null) return;

    const idTimer = setTimeout(() => {
      console.log(value);
      onSearch(value);
    }, 200);

    return () => {
      clearTimeout(idTimer);
    };
  }, [value]);

  return (
    <div className="d-flex justify-content-end align-items-center">
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

export default SearchContacts;
