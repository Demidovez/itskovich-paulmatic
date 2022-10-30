import moment from "moment/moment";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import parse from "html-react-parser";
import { Element, scroller } from "react-scroll";
import { useEffect, useRef, useState } from "react";
import { MdDone, MdDoneAll } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import "./ChatViewCard.scss";

const ChatViewCard = ({ message, isSearched, isLast }) => {
  useEffect(() => {
    if (isSearched) {
      scroller.scrollTo("message_searched", {
        duration: 300,
        delay: 0,
        smooth: true,
        offset: -50,
        containerId: "scrollable-messages",
        isDynamic: true,
      });
    }
  }, [isSearched]);

  return (
    <Element
      key={message.Time}
      name={`message_${isSearched ? "searched" : "simple"}`}
      className={`chat-message-wrapper ${
        isSearched ? "searched-message" : ""
      } chat-view-card-component`}
    >
      <div
        className={`chat-message d-flex ${
          message.My ? "flex-row-reverse" : ""
        }`}
      >
        <Card className={`shadow`} style={{ maxWidth: "80%" }}>
          <CardHeader className="pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center">
            <div className="pl-2 message-user pr-4">
              {message.My ? "Вы" : (message.Contact || {}).name || ""}
            </div>
            <div className="d-flex align-items-center">
              <div className="pr-2 message-time" style={{ paddingTop: 2 }}>
                {moment(message.Time).format("DD MMM yy HH:mm")}
              </div>
              {message.Opened ? <MdDoneAll color="green" /> : <MdDone />}
            </div>
          </CardHeader>
          <CardBody className="pt-2 pb-2 pl-3 pr-3 message-text">
            {parse(
              (message.Body || "").replace(/\<body[^>]*\>([^]*)\<\/body/m, "")
            )}
            {isLast ? (
              <div className="files">
                {[
                  {
                    Name: "Ананас.jpg",
                    Content:
                      "https://petapixel.com/assets/uploads/2022/07/DALLEcopy.jpg",
                  },
                  {
                    Name: "Картинка.jpg",
                    Content:
                      "https://static.vecteezy.com/packs/media/vectors/term-bg-1-666de2d9.jpg",
                  },
                ].map((file, index) => (
                  <a
                    href={file.Content}
                    target="_blank"
                    key={index}
                    onClick={() => {}}
                    className=""
                  >
                    <div>
                      <BsDownload />
                    </div>
                    <span>{file.Name}</span>
                  </a>
                ))}
              </div>
            ) : null}
          </CardBody>
        </Card>
      </div>
    </Element>
  );
};

export default ChatViewCard;
