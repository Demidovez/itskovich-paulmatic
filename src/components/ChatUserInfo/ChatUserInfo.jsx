import "./ChatUserInfo.scss";

const ChatUserInfo = () => {
  return (
    <div className="chat-user-info-component">
      <h5>Демидовец Николай</h5>
      <div className="chat-user-info">
        <div>nikolaydemidovez@gmail.com</div>
        <div>+792123456789</div>
        <a href="/" target="_blank">
          Открыть в LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ChatUserInfo;
