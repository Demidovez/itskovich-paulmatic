import { Card, CardBody } from 'reactstrap';

const ChatViewInfoCard = ({ message }) => {
  return (
    <div className={'chat-message d-flex justify-content-center'}>
      <Card className="shadow" style={{ borderRadius: '50px' }}>
        <CardBody
          className="pt-2 pb-2 pl-3 pr-3 message-text text-center"
          style={{ fontSize: 14, opacity: 0.7, fontWeight: 200 }}
        >
          {message.Body}
        </CardBody>
      </Card>
    </div>
  );
};

export default ChatViewInfoCard;
