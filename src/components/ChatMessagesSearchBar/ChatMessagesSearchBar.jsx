import { Input } from "reactstrap";
import { MdOutlineSearch } from "react-icons/md";
import { useLazySearchChatQuery } from "store/api/inbox";
import { useEffect, useState } from "react";
import "./ChatMessagesSearchBar.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSearchedMessage } from "store/slices/inboxSlice";

const ChatMessagesSearchBar = ({ className = "" }) => {
  const dispatch = useDispatch();

  const [result, setResult] = useState({ items: [] });
  const [searchMessages, { data: messages, isFetching }] =
    useLazySearchChatQuery();
  const [isShowResult, setIsShowResult] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const startSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    if (searchValue.length >= 4) {
      searchMessages({ Body: searchValue });
    } else {
      setResult({ items: [] });
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isFetching) {
      setResult({ items: messages || [] });
    }
  }, [isFetching]);

  useEffect(() => {
    if (result.items.length) {
      setTimeout(() => setIsShowResult(true), 200);
    } else {
      setIsShowResult(false);
    }
  }, [result.items.length > 0]);

  const goToChat = (message) => {
    dispatch(setSearchedMessage(message));
  };

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
        id="searchbar"
        type="search"
        style={{ background: "none" }}
        value={searchValue}
        onChange={(e) => startSearch(e.target.value)}
        autoComplete="off"
        onBlur={() => setIsShowResult(false)}
        onFocus={() => setIsShowResult(true)}
      />
      {result.items.length ? (
        <div
          className="result-wrapper"
          style={{
            opacity: isShowResult ? 1 : 0,
            zIndex: isShowResult ? 101 : -1,
          }}
        >
          {result.items.map((message) => (
            <div
              key={message.id}
              className="result-item"
              onClick={() => goToChat(message)}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="result-user">{message.Contact.name}</div>
                <div className="result-time">
                  {moment(message.Time).format("DD MMM yy HH:mm")}
                </div>
              </div>

              <div className="result-preview">{message.PlainBodyShort}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ChatMessagesSearchBar;
