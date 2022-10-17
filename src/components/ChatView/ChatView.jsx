import { useState } from "react";
import moment from "moment/moment";
import "./ChatView.scss";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const ChatView = ({ className, messages = [] }) => {
  const [messages1] = useState([
    {
      id: 0,
      message: "Привет. У вас есть время обсудить?",
      contact: "Демидовец Николай",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: false,
    },
    {
      id: 1,
      message: "Добрый день. Конечно, давайте!",
      contact: "Ицкович Антон",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: true,
    },
    {
      id: 2,
      message: "Хотя давайте через час",
      contact: "Ицкович Антон",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: true,
    },
    {
      id: 3,
      message: "Хорошо, напишите как осовобидесь",
      contact: "Демидовец Николай",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: false,
    },
    {
      id: 4,
      message: "Я свободен, давайте обсудим",
      contact: "Ицкович Антон",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: true,
    },
    {
      id: 5,
      message:
        "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни. Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики. Великий Оксмокс предупреждал ее о злых запятых, диких знаках вопроса и коварных точках с запятой, но текст не дал сбить себя с толку. Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу.",
      contact: "Демидовец Николай",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: false,
    },
    {
      id: 6,
      message: "У нас в штате около 2000 сотрудников",
      contact: "Демидовец Николай",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
      isMe: false,
    },
  ]);
  return (
    <div className={`chat-view-component ${className}`}>
      <div className="chat-body">
        {messages.length ? (
          messages1.map((message) => (
            <div
              key={message.id}
              className={`chat-message d-flex ${
                message.isMe ? "flex-row-reverse" : ""
              }`}
            >
              <Card className="shadow" style={{ maxWidth: 600 }}>
                <CardHeader className="pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center">
                  <div className="pl-2 message-user pr-4">
                    {message.contact}
                  </div>
                  <div className="pr-2 message-time">{message.time}</div>
                </CardHeader>
                <CardBody className="pt-2 pb-2 pl-3 pr-3 message-text">
                  {message.message}
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
