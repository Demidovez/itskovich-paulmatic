import ChatEditor from "components/ChatEditor/ChatEditor";
import ChatUserInfo from "components/ChatUserInfo/ChatUserInfo";
import ChatView from "components/ChatView/ChatView";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { useLazySearchChatQuery } from "store/api/inbox";
import { useLazySendMessageQuery } from "store/api/inbox";
import { updateChatByOneMessageFromServer } from "store/slices/commonSlice";
import { updateChatByOneMessage } from "store/slices/commonSlice";
import "./ChatBody.scss";

const ChatBody = () => {
  const dispatch = useDispatch();

  const [chat, setChat] = useState(null);
  const [searchMessagesOfChat, { data: messages }] = useLazySearchChatQuery();

  const { activeChatId } = useSelector((state) => state.inbox);
  const chats = useSelector((state) => state.common.Chats.Chats);

  const [sendMessageToServer, { data: messageFromServer }] =
    useLazySendMessageQuery();

  useEffect(() => {
    if (activeChatId >= 0 && chats) {
      setChat(chats.find((chat) => chat.Contact.id === activeChatId) || null);
    }
  }, [activeChatId, chats]);

  useEffect(() => {
    if (activeChatId >= 0) {
      searchMessagesOfChat({
        ChatId: activeChatId,
      });
    }
  }, [activeChatId]);

  const sendMessage = (message) => {
    sendMessageToServer({
      ChatId: chat.Contact.id,
      Body: message,
    });

    dispatch(
      updateChatByOneMessage({
        ChatId: chat.Contact.id,
        Body: message,
      })
    );
  };

  useEffect(() => {
    if ((messageFromServer || {}).id) {
      dispatch(updateChatByOneMessageFromServer(messageFromServer));
    }
  }, [(messageFromServer || {}).id]);

  return (
    <Col
      md={9}
      className="chat-body-component d-flex pl-0 flex-column overflow-hidden h-100"
    >
      {messages && chat ? (
        <>
          <ChatUserInfo user={chat.Contact} />
          <div className="overflow-auto flex-fill">
            <ChatView className="flex-fill" chat={chat} messages={messages} />
          </div>

          <ChatEditor className="border-top" sendMessage={sendMessage} />
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
