import moment from "moment/moment";
import { useState } from "react";
import "./ChatsListBar.scss";

const ChatsListBar = ({ className = "" }) => {
  const [chats] = useState([
    {
      id: 0,
      message: "Мы получили Ваше письмо. Спасибо!",
      contact: "Ирина Ивановв",
      time: moment().add(0, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 1,
      message: "Привет, Антон!",
      contact: "Игорь Петров",
      time: moment().add(-1, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 2,
      message:
        "Добрый день, Вы нам писали по поводу тех последовательностей по металлургии. У нас есть пару вопросов. У вас есть время обсудить? Основной наш вопрос - стоимость. О каком бюджете идет речь?",
      contact: "ООО «Чайка»",
      time: moment().add(-2, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 3,
      message: "А Вы где сейчас?",
      contact: "Ицкович Антон",
      time: moment().add(-3, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 4,
      message: "А Вы где сейчас?",
      contact: "Ицкович Антон",
      time: moment().add(-3, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 5,
      message:
        "Добрый день, Вы нам писали по поводу тех последовательностей по металлургии. У нас есть пару вопросов. У вас есть время обсудить? Основной наш вопрос - стоимость. О каком бюджете идет речь?",
      contact: "ООО «Море»",
      time: moment().add(-2, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 6,
      message:
        "Добрый день, Вы нам писали по поводу тех последовательностей по металлургии. У нас есть пару вопросов. У вас есть время обсудить? Основной наш вопрос - стоимость. О каком бюджете идет речь?",
      contact: "ООО «Остров»",
      time: moment().add(-2, "day").format("DD MMM yy HH:mm"),
    },
    {
      id: 7,
      message:
        "Здравствуйте, Вы нам писали по поводу тех последовательностей по металлургии. У нас есть пару вопросов. У вас есть время обсудить? Основной наш вопрос - стоимость. О каком бюджете идет речь?",
      contact: "ООО «Река»",
      time: moment().add(-2, "day").format("DD MMM yy HH:mm"),
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(-1);

  return (
    <div className={`chats-list-bar-component pl-3 pr-3 ${className}`}>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chat ${activeChatId === chat.id ? "active" : ""}`}
          onClick={() => setActiveChatId(chat.id)}
        >
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="chat-user">{chat.contact}</div>
            <div className="chat-time">{chat.time}</div>
          </div>
          <div className="chat-preview">
            {chat.message.length >= 115
              ? chat.message.slice(0, 115) + "..."
              : chat.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsListBar;
