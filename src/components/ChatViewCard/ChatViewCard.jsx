import moment from "moment/moment";
import { Card, CardBody, CardHeader } from "reactstrap";
import parse from "html-react-parser";
import { Element, scroller } from "react-scroll";
import { useEffect, useRef, useState } from "react";

const ChatViewCard = ({ message, isSearched }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearched) {
      scroller.scrollTo("message_searched", {
        duration: 300,
        smooth: true,
        offset: -50,
        containerId: "scrollable-messages",
        isDynamic: true,
      });
    }
  }, [isSearched, scrollPosition]);

  return (
    <Element
      key={message.Time}
      name={`message_${isSearched ? "searched" : "simple"}`}
      className={`chat-message-wrapper ${isSearched ? "searched-message" : ""}`}
    >
      <div
        className={`chat-message d-flex ${
          message.My ? "flex-row-reverse" : ""
        }`}
      >
        <Card className={`shadow`} style={{ maxWidth: "80%" }}>
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
    </Element>
  );
};

export default ChatViewCard;
