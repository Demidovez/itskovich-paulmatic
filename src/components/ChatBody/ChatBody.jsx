import ChatEditor from "components/ChatEditor/ChatEditor";
import ChatUserInfo from "components/ChatUserInfo/ChatUserInfo";
import ChatView from "components/ChatView/ChatView";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import "./ChatBody.scss";

const ChatBody = () => {
  const [chat, setChat] = useState(null);

  const { activeChatId } = useSelector((state) => state.inbox);
  const chats = useSelector((state) => state.common.Chats.Chats);

  useEffect(() => {
    if (activeChatId >= 0 && chats) {
      setChat(
        chats.find((chat) => chat.Msgs[0].ChatId === activeChatId) || null
      );
    }
  }, [activeChatId, chats]);

  return (
    <Col
      md={9}
      className="chat-body-component d-flex pl-0 flex-column overflow-hidden h-100"
    >
      {chat ? (
        <>
          <ChatUserInfo user={chat.Contact} />
          <div className="overflow-auto flex-fill">
            <ChatView className="flex-fill" messages={chat.Msgs} />
          </div>

          <ChatEditor className="border-top" />
        </>
      ) : (
        <div className="no-chat-active">
          Для начала переписки выберите чат слева
        </div>
      )}
    </Col>
  );
};

export default ChatBody;
