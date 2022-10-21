import { Fragment, useEffect, useRef, useState } from "react";
import ChatViewCard from "components/ChatViewCard/ChatViewCard";
import "./ChatView.scss";
import ChatViewInfoCard from "components/ChatViewInfoCard/ChatViewInfoCard";
import { useSelector } from "react-redux";

const ChatView = ({ className, chat = { Msgs: [] } }) => {
  const botRef = useRef(null);

  const searchedMessageId = useSelector(
    (state) => state.inbox.searchedMessageId
  );

  useEffect(() => {
    botRef && botRef.current.scrollIntoView();
  }, [chat.Msgs.length, botRef]);

  return (
    <div className="overflow-auto flex-fill" id="scrollable-messages">
      <div className={`chat-view-component ${className}`}>
        <div className="chat-body">
          {chat.Msgs.length ? (
            [...chat.Msgs]
              .sort((m1, m2) => m1.id - m2.id)
              .map((message) => (
                <Fragment key={message.Time}>
                  {message.Contact ? (
                    <ChatViewCard
                      message={message}
                      isSearched={searchedMessageId === message.id}
                    />
                  ) : chat.Msgs.length === 1 ? (
                    <ChatViewInfoCard message={message} />
                  ) : null}
                </Fragment>
              ))
          ) : (
            <div className="no-chat-messages">
              Чтобы начать диалог отправьте сообщение контакту!
            </div>
          )}
        </div>
        <span ref={botRef} />
      </div>
    </div>
  );
};

export default ChatView;
