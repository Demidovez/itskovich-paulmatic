import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import "./ChatView.scss";
import { Card, CardBody, CardHeader } from "reactstrap";

const ChatView = ({ className, chat = { Msgs: [] } }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef && bottomRef.current.scrollIntoView();
  }, [chat.Msgs.length, bottomRef]);

  return (
    <div className={`chat-view-component ${className}`}>
      <div className="chat-body">
        {chat.Msgs.length ? (
          [...chat.Msgs]
            .sort((m1, m2) => moment(m1.Time) - moment(m2.Time))
            .map((message) => (
              <div
                key={message.Time}
                className={`chat-message d-flex ${
                  message.My ? "flex-row-reverse" : ""
                }`}
              >
                <Card className="shadow" style={{ maxWidth: 600 }}>
                  <CardHeader className="pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center">
                    <div className="pl-2 message-user pr-4">
                      {chat.Contact.name}
                    </div>
                    <div className="pr-2 message-time">
                      {moment(message.Time).format("DD MMM yy HH:mm")}
                    </div>
                  </CardHeader>
                  <CardBody className="pt-2 pb-2 pl-3 pr-3 message-text">
                    {message.Body}
                  </CardBody>
                </Card>
              </div>
            ))
        ) : (
          <div className="no-chat-messages">
            Чтобы начать диалог отправьте сообщение контакту!
          </div>
        )}
        <span ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatView;
