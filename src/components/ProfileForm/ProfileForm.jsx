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
import { useDispatch } from "react-redux";
import { HiOutlineMail } from "react-icons/hi";
import "./ProfileForm.scss";
import { setIsNeedSetEmailServer } from "store/slices/commonSlice";
import { useSelector } from "react-redux";
import { useLazyTryUpdateQuery } from "store/api/login";
import { useEffect, useState } from "react";
import { updateAccount } from "store/slices/commonSlice";
import ModalYouSure from "components/ModalYouSure/ModalYouSure";
import { useLazyTryDeleteQuery } from "store/api/login";

const NICKNAME_REGEX = /^[A-Za-z0-9_]+$/;

const ProfileForm = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [tryUpdate, { data: updateAccountResponse, error, isFetching }] =
    useLazyTryUpdateQuery();

  useEffect(() => {
    if (!isFetching && updateAccountResponse) {
      if ((updateAccountResponse || {}).username) {
        dispatch(
          updateAccount({
            ...updateAccountResponse,
          })
        );
        // localStorage.setItem(
        //   "Account",
        //   JSON.stringify({
        //     ...updateAccountResponse,
        //   })
        // );
        setIsLoading(false);
        setResultError("");
      } else {
        setResultError("Ошибка! Попробуйте еще раз... ");
        setIsLoading(false);
      }
    } else if (isFetching) {
      setIsLoading(true);
    }
  }, [updateAccountResponse, isFetching]);

  useEffect(() => {
    if (error && error.status !== 200) {
      setResultError(
        error &&
          (error.data.message ||
            error.data.error.message ||
            "Ошибка! Попробуйте еще раз...")
      );
      setIsLoading(false);
    } else {
      setResultError("");
    }
  }, [JSON.stringify(error), isFetching]);

  const Account = useSelector((state) => state.common.Account || {});

  const formik = useFormik({
    initialValues: {
      username: Account.fullName || "",
      nickname: Account.nickname || "",
      directorUsername: Account.directorUsername || "",
      password: Account.password || "",
      company: Account.company || "",
      // agree: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      nickname: Yup.string()
        .matches(NICKNAME_REGEX, "Буквы латинского алфавита, цифры и _")
        .required("Обязательное поле"),
      directorUsername: Yup.string().email("Неверный E-mail"),
      password: Yup.string()
        .min(5, "Требуется минимум 5 символов")
        .required("Обязательное поле"),
      company: Yup.string().required("Обязательное поле"),
      // agree: Yup.boolean().oneOf([true], "Обязательное поле"),
    }),
    onSubmit: (values) => {
      tryUpdate({
        fullName: values.username,
        nickname: values.nickname,
        username: Account.username,
        password: values.password,
        company: values.company,
        directorUsername: values.directorUsername,
      });
    },
  });

  const [isAskSure, setIsAskSure] = useState(false);
  const [tryDelete] = useLazyTryDeleteQuery();

  const onDeleteSubmit = () => {
    setIsAskSure(false);
    tryDelete();
  };

  return (
    <div className="profile-form-component" style={{ background: "#4450ff" }}>
      <Container className="align-items-center" fluid>
        <Row>
          <Col lg="1"></Col>
          <Col lg="4" className="d-flex align-items-center ">
            <div className="py-7 d-flex w-100 flex-column">
              <h4>Данные</h4>
              <div className="contacts mt-4 ">
                <Form
                  role="form"
                  className={`contacts-form ${className} shadow`}
                  onSubmit={formik.handleSubmit}
                >
                  <FormGroup className={`field-wrapper mb-3`}>
                    <span>E-mail</span>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: 20 }}
                    >
                      <Input
                        placeholder="E-mail"
                        type="text"
                        name="useremail"
                        autoComplete="email"
                        disabled={true}
                        defaultValue={Account.username}
                      />
                      <Button
                        style={{
                          backgroundColor: "#4450ff",
                          border: "none",
                        }}
                        className="d-flex align-items-center"
                        onClick={() => dispatch(setIsNeedSetEmailServer(true))}
                      >
                        <HiOutlineMail size="1.3rem" color="white" />
                        <span
                          className="text-white m-0"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Настроить почту
                        </span>
                      </Button>
                    </div>
                  </FormGroup>
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.username && formik.errors.username
                        ? "has-error"
                        : ""
                    } mb-3`}
                  >
                    <span>Имя</span>
                    <Input
                      placeholder="Имя"
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
                    <span>Логин</span>
                    <Input
                      placeholder="Буквы латинского алфавита, цифры и _"
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
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.password && formik.errors.password
                        ? "has-error"
                        : ""
                    } mb-3`}
                  >
                    <span>Пароль</span>
                    <Input
                      placeholder="Пароль"
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
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.company && formik.errors.company
                        ? "has-error"
                        : ""
                    } mb-3`}
                  >
                    <span>Компания</span>
                    <Input
                      placeholder="Компания"
                      type="text"
                      name="company"
                      autoComplete="organization"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company}
                    />
                    <div className="field-error">
                      {formik.touched.company && formik.errors.company
                        ? formik.errors.company
                        : ""}
                    </div>
                  </FormGroup>
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.directorUsername &&
                      formik.errors.directorUsername
                        ? "has-error"
                        : ""
                    } mb-0`}
                  >
                    <span>E-mail директора</span>
                    <Input
                      placeholder="E-mail директора"
                      type="text"
                      name="directorUsername"
                      autoComplete="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.directorUsername}
                    />
                    <div className="field-error">
                      {formik.touched.directorUsername &&
                      formik.errors.directorUsername
                        ? formik.errors.directorUsername
                        : ""}
                    </div>
                  </FormGroup>
                </Form>
                <div className="position-relative mt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <Button
                      className=""
                      color="primary"
                      type="button"
                      onClick={formik.handleSubmit}
                      disabled={isLoading}
                      style={{
                        background: "#f9b237",
                        borderRadius: 40,
                        minWidth: 120,
                      }}
                    >
                      {isLoading ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        "Сохранить"
                      )}
                    </Button>
                    <Button
                      className=""
                      color="primary"
                      type="button"
                      style={{
                        background: "var(--orange)",
                        borderRadius: 40,
                        minWidth: 120,
                      }}
                      onClick={() => setIsAskSure(true)}
                    >
                      Удалить аккаунт
                    </Button>
                  </div>
                  <div className="server-error mt-2">
                    {resultError ? resultError : ""}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="2"></Col>
          <Col lg="4" className="d-flex align-items-center">
            <div className="description">
              <h4>Развитие бизнеса</h4>
              <p>
                <span>/</span> Постройте прочные отношения с возможными
                партнерами для долгосрочного роста бизнеса
              </p>
              <p>
                <span>/</span> Свяжитесь с потенциальными партнерами в масштабе
              </p>
              <p>
                <span>/</span> Систематически поддерживать связь с вашей
                партнерской сетью
              </p>
              <p>
                <span>/</span> Отслеживайте эффективность кампании, чтобы
                улучшить результаты
              </p>
            </div>
          </Col>
          <Col lg="1"></Col>
        </Row>
      </Container>
      <ModalYouSure
        isShow={isAskSure}
        title={"Удалить аккаунт"}
        text={"Вы действительно хотите удалить аккаунт?"}
        onAgree={onDeleteSubmit}
        onCancel={() => {
          setIsAskSure(false);
        }}
      />
    </div>
  );
};

export default ProfileForm;
