import moment from "moment/moment";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatId } from "store/slices/inboxSlice";
import { Element, scroller } from "react-scroll";
import { MdDone, MdDoneAll } from "react-icons/md";
import "./ChatsListBar.scss";

const ChatsListBar = ({ className = "" }) => {
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const allChats = useSelector((state) => state.common.Chats.Chats);
  const ModifiedTime = useSelector((state) => state.common.Chats.ModifiedTime);
  const activeFolderId = useSelector((state) => state.inbox.activeFolderId);
  const activeChatId = useSelector((state) => state.inbox.activeChatId);
  const searchedChatId = useSelector((state) => state.inbox.searchedChatId);
  const searchChatUser = useSelector((state) => state.inbox.searchChatUser);

  useEffect(() => {
    if (activeFolderId > 0) {
      setChats(
        allChats.filter(
          (chat) =>
            chat.FolderID === activeFolderId &&
            (searchChatUser
              ? (chat.Contact.FirstName + " " + chat.Contact.LastName)
                  .toLowerCase()
                  .includes(searchChatUser.toLowerCase())
              : true)
        )
      );
    } else if (activeFolderId === 0) {
      setChats(
        allChats.filter((chat) =>
          searchChatUser
            ? (chat.Contact.FirstName + " " + chat.Contact.LastName)
                .toLowerCase()
                .includes(searchChatUser.toLowerCase())
            : true
        )
      );
    }
  }, [activeFolderId, allChats.length, searchChatUser, ModifiedTime]);

  const selectActiveChatId = (id) => {
    dispatch(setActiveChatId(id));
  };

  useEffect(() => {
    if (searchedChatId >= 0) {
      scroller.scrollTo("chat_" + searchedChatId, {
        duration: 300,
        smooth: true,
        containerId: "scrollable",
      });
    }
  }, [searchedChatId]);

  return (
    <div className={`chats-list-bar-component pl-3 pr-3 ${className} `}>
      {chats.length ? (
        chats.map((chat) => (
          <Element
            name={"chat_" + chat.Contact.id}
            className="element"
            key={chat.Contact.id}
          >
            <div
              className={`chat ${
                activeChatId === chat.Contact.id ? "active" : ""
              }`}
              onClick={() => selectActiveChatId(chat.Contact.id)}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="chat-user">
                  {chat.Contact.FirstName + " " + chat.Contact.LastName}
                </div>
                <div className="chat-time d-flex align-items-center">
                  {moment(chat.Msgs.slice(-1)[0].Time).format(
                    "DD MMM yy HH:mm"
                  )}
                  <span className="pl-2" style={{ marginTop: -4 }}>
                    {chat.Msgs.slice(-1)[0].Opened ? (
                      <MdDoneAll size="1.0rem" />
                    ) : (
                      <MdDone size="1.0rem" />
                    )}
                  </span>
                </div>
              </div>
              <div className="chat-subject">
                {chat.Msgs.slice(-1)[0].Subject}
              </div>
              <div className="chat-preview">
                {chat.Msgs.slice(-1)[0].PlainBodyShort ||
                  (chat.Msgs.slice(-1)[0].Body.length >= 115
                    ? chat.Msgs.slice(-1)[0].Body.slice(0, 115) + "..."
                    : chat.Msgs.slice(-1)[0].Body)}
              </div>
            </div>
          </Element>
        ))
      ) : (
        <div className="no-chats">Сообщений пока нет</div>
      )}
    </div>
  );
};

export default ChatsListBar;
