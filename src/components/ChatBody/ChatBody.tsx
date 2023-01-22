import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { toast } from 'react-toastify';
import { Col } from 'reactstrap';

import ChatEditor from '~src/components/ChatEditor/ChatEditor';
import ChatUserInfo from '~src/components/ChatUserInfo/ChatUserInfo';
import ChatView from '~src/components/ChatView/ChatView';
import { useLazySearchChatQuery } from '~src/store/api/inbox';
import { useLazySendMessageQuery } from '~src/store/api/inbox';
import { updateChatByOneMessageFromServer } from '~src/store/slices/commonSlice';
import { updateChatByAllMessagesFromServer } from '~src/store/slices/commonSlice';
import { updateChatByOneMessage } from '~src/store/slices/commonSlice';

import 'react-reflex/styles.css';
import './ChatBody.scss';

const ChatBody = () => {
  const dispatch = useDispatch();

  const [ chat, setChat ] = useState(null);
  const [ searchMessagesOfChat, { data: messages } ] = useLazySearchChatQuery();

  const activeChatId = useSelector((state) => state.inbox.activeChatId);

  const chats = useSelector((state) => state.common.Chats.Chats);
  const ModifiedTime = useSelector((state) => state.common.Chats.ModifiedTime);
  const activeChat = useSelector((state) => state.common.Chats.ActiveChat);

  const [ sendMessageToServer, { data: messageFromServer, error, isError } ] =
    useLazySendMessageQuery();

  useEffect(() => {
    if (activeChat.Contact.id) {
      setChat(activeChat);
    } else {
      setChat(chats.find((chat) => chat.Contact.id === activeChatId));
    }
  }, [ chats, activeChat, activeChatId, ModifiedTime ]);

  useEffect(() => {
    if (activeChatId >= 0) {
      searchMessagesOfChat({
        ChatId: activeChatId,
      });
    }
  }, [activeChatId]);

  const sendMessage = (message, attachedFiles) => {
    sendMessageToServer({
      ChatId: activeChatId,
      Body: message,
      Attachments: attachedFiles,
    });

    dispatch(
      updateChatByOneMessage({
        ChatId: activeChatId,
        Body: message,
      }),
    );
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.data.message ||
          error.data.error.message ||
          'Ошибка! Попробуйте еще раз...',
      );
    }
  }, [ error, isError ]);

  useEffect(() => {
    if ((messageFromServer || {}).id) {
      dispatch(updateChatByOneMessageFromServer(messageFromServer));
    }
  }, [(messageFromServer || {}).id]);

  useEffect(() => {
    messages && dispatch(updateChatByAllMessagesFromServer(messages));
  }, [messages]);

  return (
    <Col
      md={9}
      className="chat-body-component d-flex pl-0 flex-column overflow-hidden h-100"
    >
      {chat ? (
        <ReflexContainer orientation="horizontal">
          <ReflexElement
            style={{ overflow: 'hidden' }}
            className="d-flex flex-column"
          >
            <ChatUserInfo user={chat.Contact} />
            <ChatView className="flex-fill" chat={chat} />
          </ReflexElement>

          <ReflexSplitter style={{ height: 1, border: 'none' }} />

          <ReflexElement minSize={300} size={300}>
            <ChatEditor
              className="border-top"
              sendMessage={sendMessage}
              chat={chat}
            />
          </ReflexElement>
        </ReflexContainer>
      ) : (
        <div className="no-chat-active">
          Для начала переписки выберите чат слева
        </div>
      )}
    </Col>
  );
};

export default ChatBody;
