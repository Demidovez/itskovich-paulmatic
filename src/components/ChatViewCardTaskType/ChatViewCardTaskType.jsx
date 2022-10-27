import moment from "moment/moment";
import { Card, CardBody, CardHeader } from "reactstrap";
import parse from "html-react-parser";
import { Element, scroller } from "react-scroll";
import { useEffect, useRef, useState } from "react";
import TypeIcon from "components/TypeIcon/TypeIcon";
import "./ChatViewCardTaskType.scss";

// const TaskType = ({type}) => {
//   let Icon;

//   switch(type) {
//     case "call": {
//       Icon = () => < />
//       break;
//     }
//       default: {
//         Icon = () => < />
//         break;
//     }
//   }

//   return <></>
// }

const ChatViewCardTaskType = ({ message, isSearched }) => {
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
      className={`chat-view-card-task-type-component chat-message-wrapper ${
        isSearched ? "searched-message" : ""
      }`}
    >
      <div
        className={`chat-message d-flex ${
          message.My ? "flex-row-reverse" : ""
        }`}
      >
        <Card className={`shadow`} style={{ maxWidth: "80%" }}>
          <CardHeader className="pt-0 pb-0 pl-2 pr-2 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="pl-2 message-user pr-3">
                {message.My ? "Вы" : (message.Contact || {}).name || ""}
              </div>
              <TypeIcon
                type={message.TaskType || "auto_email"}
                className="d-flex align-items-center justify-content-center type-icon mr-3 shadow"
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="pr-2 message-time" style={{ paddingTop: 2 }}>
                {moment(message.Time).format("DD MMM yy HH:mm")}
              </div>
            </div>
          </CardHeader>
          <CardBody className="pt-2 pb-2 pl-3 pr-3 message-text d-flex align-items-center">
            <div>{parse(message.Body)}</div>
          </CardBody>
        </Card>
      </div>
    </Element>
  );
};

export default ChatViewCardTaskType;
