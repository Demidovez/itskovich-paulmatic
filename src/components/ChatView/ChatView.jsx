import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import "./ChatView.scss";
import { Card, CardBody, CardHeader } from "reactstrap";
import parse from "html-react-parser";

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
            .sort((m1, m2) => moment(m2.id) - moment(m1.id))
            .map((message) => (
              <div
                key={message.Time}
                className={`chat-message d-flex ${
                  message.My ? "flex-row-reverse" : ""
                }`}
              >
                <Card className="shadow" style={{ maxWidth: "80%" }}>
                  <CardHeader className="pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center">
                    <div className="pl-2 message-user pr-4">
                      {(message.Contact || {}).name || ""}
                    </div>
                    <div className="pr-2 message-time">
                      {moment(message.Time).format("DD MMM yy HH:mm")}
                    </div>
                  </CardHeader>
                  <CardBody className="pt-2 pb-2 pl-3 pr-3 message-text">
                    {parse(message.Body)}
                  </CardBody>
                </Card>
              </div>
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
