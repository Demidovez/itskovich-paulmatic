import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatId } from "store/slices/inboxSlice";
import "./ChatsListBar.scss";

const ChatsListBar = ({ className = "" }) => {
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const { Chats: allChats, ModifiedTime } = useSelector(
    (state) => state.common.Chats
  );
  const { activeFolderId, activeChatId, searchChatUser } = useSelector(
    (state) => state.inbox
  );

  useEffect(() => {
    if (activeFolderId > 0) {
      setChats(
        allChats.filter(
          (chat) =>
            chat.FolderID === activeFolderId &&
            (searchChatUser
              ? chat.Contact.name
                  .toLowerCase()
                  .includes(searchChatUser.toLowerCase())
              : true)
        )
      );
    } else if (activeFolderId === 0) {
      setChats(
        allChats.filter((chat) =>
          searchChatUser
            ? chat.Contact.name
                .toLowerCase()
                .includes(searchChatUser.toLowerCase())
            : true
        )
      );
    }
  }, [activeFolderId, allChats, searchChatUser, ModifiedTime]);

  const selectActiveChatId = (id) => {
    dispatch(setActiveChatId(id));
  };

  return (
    <div className={`chats-list-bar-component pl-3 pr-3 ${className}`}>
      {chats.length ? (
        chats.map((chat) => (
          <div
            key={chat.Contact.id}
            className={`chat ${
              activeChatId === chat.Contact.id ? "active" : ""
            }`}
            onClick={() => selectActiveChatId(chat.Contact.id)}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="chat-user">{chat.Contact.name}</div>
              <div className="chat-time">
                {moment(chat.Msgs.slice(-1)[0].Time).format("DD MMM yy HH:mm")}
              </div>
            </div>
            <div className="chat-preview">
              {chat.Msgs.slice(-1)[0].PlainBodyShort ||
                (chat.Msgs.slice(-1)[0].Body.length >= 115
                  ? chat.Msgs.slice(-1)[0].Body.slice(0, 115) + "..."
                  : chat.Msgs.slice(-1)[0].Body)}
            </div>
          </div>
        ))
      ) : (
        <div className="no-chats">Сообщений пока нет</div>
      )}
    </div>
  );
};

export default ChatsListBar;
