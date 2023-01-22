import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ChatViewCard from '~src/components/ChatViewCard/ChatViewCard';
import ChatViewCardTaskType from '~src/components/ChatViewCardTaskType/ChatViewCardTaskType';
import ChatViewInfoCard from '~src/components/ChatViewInfoCard/ChatViewInfoCard';

import './ChatView.scss';

const ChatView = ({ className, chat = { Msgs: []}}) => {
  const botRef = useRef(null);

  const searchedMessageId = useSelector(
    (state) => state.inbox.searchedMessageId,
  );

  useEffect(() => {
    botRef && botRef.current.scrollIntoView();
  }, [ chat.Msgs.length, botRef ]);

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
                    message.TaskType ? (
                      <ChatViewCardTaskType
                        message={message}
                        isSearched={searchedMessageId === message.id}
                      />
                    ) : (
                      <ChatViewCard
                        message={message}
                        isSearched={searchedMessageId === message.id}
                      />
                    )
                  ) : (
                    <ChatViewInfoCard message={message} />
                  )}
                  {}
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
