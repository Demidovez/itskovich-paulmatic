import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { useLazyGetTariffsQuery } from "store/api/common";
import { setTariffs } from "store/slices/commonSlice";
import { MdDone } from "react-icons/md";
import "./Tariffs.scss";

const PRICE = {
  0: "Бесплатно",
  "-1": "Индивидуально",
};

const Tariffs = () => {
  const dispatch = useDispatch();

  const tariffs = useSelector((state) => state.common.tariffs);
  const currentTariff = useSelector(
    (state) => state.common.Account.Tariff.Creds.Name
  );

  const [getTariffs, { data: tariffResponse }] = useLazyGetTariffsQuery();

  useEffect(() => {
    getTariffs();
  }, []);

  useEffect(() => {
    if (tariffResponse) {
      dispatch(setTariffs(tariffResponse));
    }
  }, [tariffResponse]);

  return (
    <div className="tariffs-component  ">
      <Container className="pb-6" fluid>
        <Row>
          <Col lg="2"></Col>
          <Col lg="8">
            <div className="pt-6 ">
              <div className="title">
                <h4>Повысьте свои продажи</h4>
                <p>
                  Используйте более быстрые циклы продаж и более предсказуемый
                  доход с помощью платформы Palmautic.
                  <br />
                  Выберите одну из подписок
                </p>
              </div>
              <div className="content">
                {tariffs.map((tariff) => (
                  <div key={tariff.Creds.Id} className="tariff">
                    <div
                      className="header"
                      style={{ backgroundColor: tariff.color || "#636bff" }}
                    >
                      <h5>{tariff.Creds.Name}</h5>
                      <div
                        className={`price ${tariff.Price === -1 ? "long" : ""}`}
                      >
                        {PRICE[tariff.Price] || tariff.Price + " ₽"}
                      </div>
                      <span>{tariff.period}</span>
                    </div>
                    <div>
                      <div className="proffits">
                        {tariff.proffitsTitle ? (
                          <div className="proffit proffit-first">
                            <span>/</span> {tariff.proffitsTitle}
                          </div>
                        ) : null}

                        {(tariff.proffits || []).map((proffit, index) => (
                          <div key={index} className="proffit">
                            <span>/</span> {proffit}
                          </div>
                        ))}
                      </div>
                      <div className="tariff-btn d-flex justify-content-center">
                        {currentTariff === tariff.Creds.Name ? (
                          <div className="tariff-current">
                            <div>
                              <MdDone />
                            </div>
                            <span>Подписка активна</span>
                          </div>
                        ) : (
                          <Button
                            style={{
                              backgroundColor: tariff.color || "#636bff",
                            }}
                          >
                            Получить доступ
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tariffs;
