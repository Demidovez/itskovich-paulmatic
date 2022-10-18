import { Fragment, useEffect, useRef, useState } from "react";
import ChatViewCard from "components/ChatViewCard/ChatViewCard";
import "./ChatView.scss";
import ChatViewInfoCard from "components/ChatViewInfoCard/ChatViewInfoCard";

const ChatView = ({ className, chat = { Msgs: [] } }) => {
  const topRef = useRef(null);

  useEffect(() => {
    topRef && topRef.current.scrollIntoView();
  }, [chat.Msgs.length, topRef]);

  return (
    <div className={`chat-view-component ${className}`}>
      <span ref={topRef} />
      <div className="chat-body">
        {chat.Msgs.length ? (
          [...chat.Msgs]
            .sort((m1, m2) => m2.id - m1.id)
            .map((message) => (
              <Fragment key={message.Time}>
                {message.Contact ? (
                  <ChatViewCard message={message} />
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
    </div>
  );
};

export default ChatView;
