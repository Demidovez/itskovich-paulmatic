import Tariffs from "components/Tariffs/Tariffs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "reactstrap";
import { ReactComponent as ArrowSvg } from "../../assets/img/arrow.svg";

const UserHeader = () => {
  const Account = useSelector((state) => state.common.Account);

  return (
    <>
      <div
        className="header pb-8 pt-6 d-flex align-items-center"
        style={{
          minHeight: "250px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="align-items-center" fluid>
          <Row>
            <Col lg="12" className="d-flex align-items-center">
              <div>
                <h1 className="display-2 text-white">
                  {`Привет${Account.fullName ? ", " + Account.fullName : ""}!`}
                </h1>
                <p className="text-white mt-0 mb-5">
                  Это страница вашего профиля. Вы можете видеть прогресс вашей
                  работы и управлять своими настройками!
                </p>
              </div>
            </Col>
            {/* <Col
              lg="2"
              className="d-flex justify-content-center align-items-end mb-6"
            >
              <ArrowSvg
                style={{ width: 100, height: 220, transform: "rotate(-70deg)" }}
                fill="white"
              />
            </Col>
            <Col lg="6"><Tariffs /></Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
