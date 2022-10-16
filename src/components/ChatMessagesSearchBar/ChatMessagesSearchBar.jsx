import { Input } from "reactstrap";
import { MdOutlineSearch } from "react-icons/md";

const ChatMessagesSearchBar = ({ className = "" }) => {
  return (
    <div
      className={`chat-messages-search-bar-component d-flex align-items-center ${className}`}
    >
      <div className="pl-2 pr-0">
        <MdOutlineSearch size="1.5rem" />
      </div>
      <Input
        placeholder="Поиск сообщений..."
        className="border-0"
        type="search"
        style={{ background: "none" }}
      />
    </div>
  );
};

export default ChatMessagesSearchBar;
