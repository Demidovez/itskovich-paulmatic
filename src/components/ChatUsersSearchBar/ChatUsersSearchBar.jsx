import { Input } from "reactstrap";
import "./ChatUsersSearchBar.scss";
import { MdOutlineSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchChatUser } from "store/slices/inboxSlice";

const ChatUsersSearchBar = ({ className = "" }) => {
  const dispatch = useDispatch();
  const searchChatUser = useSelector((state) => state.inbox.searchChatUser);

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
        value={searchChatUser}
        onChange={(e) => dispatch(setSearchChatUser(e.target.value))}
      />
    </div>
  );
};

export default ChatUsersSearchBar;
