import React from "react";
import { Card, CardHeader, Container, Row, Col, CardBody } from "reactstrap";
import InteractiveTour from "components/InteractiveTour/InteractiveTour";
import ChatFolders from "components/ChatFolders/ChatFolders";
import ChatMessagesSearchBar from "components/ChatMessagesSearchBar/ChatMessagesSearchBar";
import ChatsListBar from "components/ChatsListBar/ChatsListBar";
import ChatUsersSearchBar from "components/ChatUsersSearchBar/ChatUsersSearchBar";
import DropdownWithIcon from "components/DropdownWithIcon/DropdownWithIcon";
import { BsListTask } from "react-icons/bs";
import ChatBody from "components/ChatBody/ChatBody";

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
                <ChatFolders />
                <DropdownWithIcon
                  label="Действия"
                  icon={() => <BsListTask size="1.0rem" />}
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
                <div className="overflow-auto pt-2" id="scrollable">
                  <ChatsListBar className="" />
                </div>
              </Col>

              <ChatBody />
            </Row>
          </CardBody>
        </Card>
      </Container>
      <InteractiveTour steps={tourSteps} name="inbox" />
    </>
  );
};

export default Inbox;
