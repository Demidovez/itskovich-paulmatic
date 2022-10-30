import Tariffs from "components/Tariffs/Tariffs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "reactstrap";
import { ReactComponent as ArrowSvg } from "../../assets/img/arrow.svg";
import "./UserHeader.scss";

const UserHeader = () => {
  const Account = useSelector((state) => state.common.Account);

  return (
    <>
      <div className="user-header-component" style={{ background: "white" }}>
        <Container className="align-items-center" fluid>
          <Row>
            <Col lg="1"></Col>
            <Col lg="10" className="d-flex align-items-center ">
              <div
                className="pb-8 pt-6 d-flex align-items-center w-100"
                style={{
                  minHeight: "250px",
                  backgroundColor: "white",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    backgroundSize: "contain",
                    backgroundPosition: "end top",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: 10,
                    backgroundPositionX: "calc(100% - 30px)",
                    backgroundImage:
                      "url(" + require("../../assets/img/Group_88.jpeg") + ")",
                  }}
                />
                <div>
                  <h1 className="display-2 text-black">
                    {`Привет${
                      Account.fullName ? ", " + Account.fullName : ""
                    }!`}
                  </h1>
                  <p className="text-black mt-0 mb-5">
                    Это страница вашего профиля. Вы можете видеть прогресс вашей
                    работы и управлять своими настройками!
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="1"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
