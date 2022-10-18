import moment from "moment/moment";
import { Card, CardBody, CardHeader } from "reactstrap";
import parse from "html-react-parser";

const ChatViewCard = ({ message }) => {
  return (
    <div
      className={`chat-message d-flex ${message.My ? "flex-row-reverse" : ""}`}
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
  );
};

export default ChatViewCard;