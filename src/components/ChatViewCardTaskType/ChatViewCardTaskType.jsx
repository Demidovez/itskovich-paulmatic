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
          <div className="pr-2 message-time text-center">
            {moment(message.Time).format("DD MMM yy HH:mm")}
          </div>
          <CardBody className="pt-2 pb-2 pl-3 pr-3 message-text d-flex align-items-center">
            <TypeIcon
              type={message.TaskType || "telegram"}
              className="d-flex align-items-center justify-content-center type-icon mr-3 shadow"
            />
            <div>{parse(message.Body)}</div>
          </CardBody>
        </Card>
      </div>
    </Element>
  );
};

export default ChatViewCardTaskType;
