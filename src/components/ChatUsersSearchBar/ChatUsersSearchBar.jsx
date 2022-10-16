import { Input } from "reactstrap";
import "./ChatUsersSearchBar.scss";
import { MdOutlineSearch } from "react-icons/md";

const ChatUsersSearchBar = ({ className = "" }) => {
  return (
    <div
      className={`chat-users-search-bar-component d-flex align-items-center ${className}`}
    >
      <div className="pl-2 pr-0">
        <MdOutlineSearch size="1.5rem" />
      </div>
      <Input
        placeholder="Поиск клиента..."
        className="border-0"
        type="search"
        style={{ background: "none" }}
      />
    </div>
  );
};

export default ChatUsersSearchBar;
