import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./Tariffs.scss";

const Tariffs = () => {
  const [tariffs] = useState([
    {
      id: 0,
      title: "Basic",
      price: "Бесплатно",
      period: "14 дней",
      color: "#636bff",
      proffitsTitle: "",
      proffits: [
        "Базовая автоматизация последовательности (Ограничение в 2 последовательности)",
        "Расширение для Gmail/LinkedIn",
        "Отправка 200 email’ов/день",
        "CSV импорт/экспорт",
        "Чтение, ответы на электронные письма",
        "Доступ к API",
        "Базовая аналитика и отчеты",
      ],
    },
    {
      id: 1,
      title: "Professional",
      price: "6600 ₽",
      period: "в месяц",
      color: "#fcb236",
      proffitsTitle: "Всё, что в «Basic»",
      proffits: [
        "Неограниченное количество последовательностей",
        "Отправка 10 000 email’ов/день",
        "Интеграция со всеми поставщиками электронной почты",
        "Расширенная аналитика, отчеты и информационные панели",
        "A/B тестирование",
        "Ручные задачи",
        "Записи звонков",
      ],
    },
    {
      id: 2,
      title: "Enterprise",
      price: "Индивидуально",
      period: "оплата за год",
      color: "#636bff",
      proffitsTitle: "Всё, что в «Professional»",
      proffits: [
        "Неограниченное количество email’ов/день",
        "Обогащение данные о контакте и смена работы",
        "Транскрипция вызовов",
        "Настраиваемые отчеты",
        "Расширенный доступ к API",
        "Персональный менеджер по работе с клиентами",
      ],
    },
  ]);

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
                  <div key={tariff.id} className="tariff">
                    <div
                      className="header"
                      style={{ backgroundColor: tariff.color }}
                    >
                      <h5>{tariff.title}</h5>
                      <div className="price">{tariff.price}</div>
                      <span>{tariff.period}</span>
                    </div>
                    <div>
                      <div className="proffits">
                        {tariff.proffitsTitle ? (
                          <div className="proffit">
                            <span>/</span> {tariff.proffitsTitle}
                          </div>
                        ) : null}

                        {tariff.proffits.map((proffit, index) => (
                          <div key={index} className="proffit">
                            <span>/</span> {proffit}
                          </div>
                        ))}
                      </div>
                      <div className="tariff-btn d-flex justify-content-center">
                        <Button style={{ backgroundColor: tariff.color }}>
                          Получить доступ
                        </Button>
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
