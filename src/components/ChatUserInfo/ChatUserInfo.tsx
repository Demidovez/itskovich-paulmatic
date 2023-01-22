import './ChatUserInfo.scss';

const ChatUserInfo = ({ user = {}}) => {
  return (
    <div className="chat-user-info-component">
      <div className="chat-user-info">
        <h5>{user.name}</h5>
        <div>{user.email}</div>
        <div>{user.phone}</div>
        {user.linkedin ? (
          <a href={user.linkedin} target="_blank">
            Открыть в LinkedIn
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default ChatUserInfo;
