import {
  Container,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PaymentForm.scss";

const NICKNAME_REGEX = /^[A-Za-z0-9_]+$/;

const PaymentForm = ({ className = "" }) => {
  const trySignUp = () => {};

  const resultError = "";
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      username: "",
      nickname: "",
      useremail: "",
      directorUsername: "",
      password: "",
      company: "",
      // agree: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      nickname: Yup.string().required("Обязательное поле"),
      useremail: Yup.string().required("Обязательное поле"),
      directorUsername: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
      company: Yup.string().required("Обязательное поле"),
      // agree: Yup.boolean().oneOf([true], "Обязательное поле"),
    }),
    onSubmit: (values) => {
      trySignUp({
        fullName: values.username,
        nickname: values.nickname,
        username: values.useremail,
        password: values.password,
        company: values.company,
        directorUsername: values.directorUsername,
      });
    },
  });

  return (
    <div className="payment-form-component" style={{ background: "#f8f8ff" }}>
      <Container className="align-items-center" fluid>
        <Row>
          <Col lg="1"></Col>
          <Col lg="4" className="d-flex align-items-center">
            <div className="description">
              <h4>Входящие продажи</h4>
              <p>
                Автоматизируйте общение с входящими потенциальными клиентами,
                обеспечивая при этом индивидуальный подход:
              </p>
              <p>
                <span>/</span> Привлекайте inbound-лиды: trial-пользователи,
                запросы на демо, отправка контента
              </p>
              <p>
                <span>/</span> Автоматизируйте работу с клиентами на каждом
                этапе продаж
              </p>
              <p>
                <span>/</span> Сосредоточьтесь на заключении сделок, пока
                Palmautic отправляет электронные письма от вашего имени
              </p>
            </div>
          </Col>
          <Col lg="2"></Col>
          <Col lg="4" className="d-flex align-items-center ">
            <div className="py-7 d-flex w-100 flex-column">
              <h4>Подписка</h4>
              <div className="contacts mt-4 ">
                <Form
                  role="form"
                  className={`contacts-form ${className} shadow`}
                  onSubmit={formik.handleSubmit}
                >
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.username && formik.errors.username
                        ? "has-error"
                        : ""
                    } mb-3`}
                  >
                    <span>Имя владельца карты</span>
                    <Input
                      placeholder="Имя владельца карты"
                      type="text"
                      name="username"
                      autoComplete="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      className="py-2"
                    />

                    <div className="field-error">
                      {formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : " "}
                    </div>
                  </FormGroup>
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.nickname && formik.errors.nickname
                        ? "has-error"
                        : ""
                    } mb-3`}
                  >
                    <span>Номер карты</span>
                    <Input
                      placeholder="Номер карты"
                      type="text"
                      name="nickname"
                      autoComplete="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.nickname}
                      className="py-2"
                    />

                    <div className="field-error">
                      {formik.touched.nickname && formik.errors.nickname
                        ? formik.errors.nickname
                        : " "}
                    </div>
                  </FormGroup>
                  <div
                    className="d-flex justify-content-between"
                    style={{ gap: 40 }}
                  >
                    <FormGroup
                      className={`field-wrapper ${
                        formik.touched.useremail && formik.errors.useremail
                          ? "has-error"
                          : ""
                      } mb-3 flex-fill`}
                    >
                      <span>Срок действия</span>
                      <Input
                        placeholder="Срок действия"
                        type="text"
                        name="useremail"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.useremail}
                      />

                      <div className="field-error">
                        {formik.touched.useremail && formik.errors.useremail
                          ? formik.errors.useremail
                          : ""}
                      </div>
                    </FormGroup>
                    <FormGroup
                      className={`field-wrapper ${
                        formik.touched.password && formik.errors.password
                          ? "has-error"
                          : ""
                      } mb-3 flex-fill`}
                    >
                      <span>CCV</span>
                      <Input
                        placeholder="CCV"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />

                      <div className="field-error">
                        {formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : ""}
                      </div>
                    </FormGroup>
                  </div>
                </Form>
                <div className="server-error">
                  {resultError ? resultError : ""}
                </div>
                <div className="position-relative mt-4 d-flex justify-content-end">
                  <Button
                    className=""
                    color="primary"
                    type="button"
                    onClick={formik.handleSubmit}
                    disabled={isLoading}
                    style={{ background: "#4450ff", borderRadius: 40 }}
                  >
                    {isLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      "Сохранить"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="1"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentForm;
