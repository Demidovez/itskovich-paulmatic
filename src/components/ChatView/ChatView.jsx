import { useState } from "react";
import moment from "moment/moment";
import "./ChatView.scss";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const ChatView = ({ className, chat = {}, messages = [] }) => {
  return (
    <div className={`chat-view-component ${className}`}>
      <div className="chat-body">
        {messages.length ? (
          messages.map((message) => (
            <div
              key={message.id}
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
      </div>
    </div>
  );
};

export default ChatView;
