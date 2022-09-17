import { Input } from "reactstrap";

const SearchContacts = (props) => {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <Input type="search" placeholder="Поиск..." />
      <i className="fas fa-search ml-2"></i>
    </div>
  );
};

export default SearchContacts;
