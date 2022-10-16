import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardFooter,
  CardBody,
  Button,
} from "reactstrap";
import InteractiveTour from "components/InteractiveTour/InteractiveTour";
import ChatTabs from "components/ChatTabs/ChatTabs";
import ChatMessagesSearchBar from "components/ChatMessagesSearchBar/ChatMessagesSearchBar";
import ChatsListBar from "components/ChatsListBar/ChatsListBar";
import ChatView from "components/ChatView/ChatView";
import ChatEditor from "components/ChatEditor/ChatEditor";
import ChatUsersSearchBar from "components/ChatUsersSearchBar/ChatUsersSearchBar";
import DropdownWithIcon from "components/DropdownWithIcon/DropdownWithIcon";
import { TbTemplate } from "react-icons/tb";
import ChatUserInfo from "components/ChatUserInfo/ChatUserInfo";

const tourSteps = [
  {
    selector: ".inbox",
    content: "Здесь Вы можете вести переписку с клиентами",
  },
];

const Inbox = () => {
  return (
    <>
      <Container fluid className="d-flex flex-column height-fill inbox">
        <Card className="shadow flex-fill mt-4 mb-3 overflow-hidden">
          <CardHeader className="p-0">
            <Row className="">
              <Col md={9} className="d-flex align-items-center">
                <ChatTabs />
                <DropdownWithIcon
                  label="Действия"
                  icon={() => <TbTemplate size="1.1rem" />}
                  size="sm"
                  className="editor-btn mr-2 ml-4"
                  items={[
                    "Переместить в «Заинтересованные»",
                    "Переместить в «Встреча»",
                    "Удалить переписку",
                  ]}
                  onSelect={() => {}}
                />
              </Col>
              <Col md={3} className="">
                <ChatMessagesSearchBar />
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="p-0 flex-fill d-flex flex-column">
            <Row className="h-100">
              <Col
                md={3}
                className="border-right pr-0 d-flex flex-column overflow-hidden h-100"
              >
                <ChatUsersSearchBar className="" />
                <div className="overflow-auto">
                  <ChatsListBar className="" />
                </div>
              </Col>
              <Col
                md={9}
                className="d-flex pl-0 flex-column overflow-hidden h-100"
              >
                <ChatUserInfo />
                <div className="overflow-auto">
                  <ChatView className="flex-fill" />
                </div>

                <ChatEditor className="border-top" />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
      <InteractiveTour steps={tourSteps} name="inbox" />
    </>
  );
};

export default Inbox;
