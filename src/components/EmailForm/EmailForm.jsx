import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./EmailForm.scss";
import { useLazyTrySignUpQuery } from "store/api/login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveAccount } from "store/slices/commonSlice";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { setCommonInfoTasks } from "store/slices/commonSlice";
import { setCommonInfoHtmlTemplates } from "store/slices/commonSlice";
import { setFolders } from "store/slices/commonSlice";
import { setChats } from "store/slices/commonSlice";
import { useHistory } from "react-router-dom";

const URL_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const EmailForm = ({
  className = "",
  isChange = false,
  server = {},
  onSubmit,
  onClose,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [trySignUp, { data: signUpResponse, error, isFetching }] =
    useLazyTrySignUpQuery();

  const trySaveEmailServer = (values) => {
    setIsLoading(true);

    setResultError("");

    setTimeout(() => {
      const answer = window.confirm("Все работает?");

      if (answer) {
        setIsLoading(false);
        setResultError("");
        onSubmit(values);
      } else {
        setIsLoading(false);
        setResultError("Ошибка! Попробуйте еще раз...");
      }
    }, 3000);
  };

  const [
    getCommonInfo,
    {
      data: commonData,
      error: errorCommonData,
      isFetching: isFetchingCommonData,
    },
  ] = useLazyGetCommonInfoQuery();

  useEffect(() => {
    if (!isFetching && signUpResponse) {
      if ((signUpResponse || {}).sessionToken) {
        dispatch(saveAccount(signUpResponse));
        localStorage.setItem("Account", JSON.stringify(signUpResponse));
        getCommonInfo();
      } else {
        setResultError("Неизвестная ошибка! Попробуйте позже... ");
      }
    } else if (isFetching) {
      setIsLoading(true);
    }
  }, [signUpResponse, isFetching]);

  useEffect(() => {
    if (
      (error && error.status !== 200) ||
      (errorCommonData && errorCommonData.status !== 200)
    ) {
      setResultError(
        (error && (error.data.message || error.data.error.message)) ||
          (errorCommonData &&
            (errorCommonData.data.message ||
              errorCommonData.data.error.message))
      );
      setIsLoading(false);
    } else {
      setResultError("");
    }
  }, [
    JSON.stringify(error),
    JSON.stringify(errorCommonData),
    isFetching,
    isFetchingCommonData,
  ]);

  useEffect(() => {
    if (commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoHtmlTemplates(commonData.Templates));
      dispatch(setFolders(commonData.Folders));
      dispatch(setChats(commonData.Chats));
    }
  }, [commonData]);

  useEffect(() => {
    if (!isFetchingCommonData && commonData) {
      history.push("/admin/index");
      setIsLoading(true);
    } else if (isFetchingCommonData) {
      setIsLoading(true);
    }
  }, [isFetchingCommonData, commonData]);

  return (
    <Formik
      initialValues={{
        Login: server.Login || "",
        Password: server.Password || "",
        SmtpPort: server.SmtpPort || "",
        ImapPort: server.ImapPort || "",
        SmtpHost: server.SmtpHost || "",
        ImapHost: server.ImapHost || "",
      }}
      enableReinitialize
      validationSchema={Yup.object({
        Login: Yup.string()
          .email("Неверный E-mail!")
          .required("Обязательное поле!"),
        Password: Yup.string().required("Обязательное поле!"),
        SmtpPort: Yup.number().typeError("Требуется число!"),
        ImapPort: Yup.number().typeError("Требуется число!"),
        SmtpHost: Yup.string().matches(
          URL_REGEX,
          "Требуется доменное имя сервера!"
        ),
        ImapHost: Yup.string().matches(
          URL_REGEX,
          "Требуется доменное имя сервера!"
        ),
      })}
      onSubmit={(values) => {
        trySaveEmailServer(values);
      }}
    >
      {(formik) => (
        <Form
          role="form"
          className={`email-form-component ${className} mt-3`}
          onSubmit={formik.handleSubmit}
        >
          <div className="d-flex">
            <FormGroup
              className={`field-wrapper ${
                formik.touched.Login && formik.errors.Login ? "has-error" : ""
              } mr-4`}
            >
              <InputGroup className="input-group-alternative mb-0">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="E-mail"
                  type="text"
                  name="Login"
                  autoComplete="nope"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Login}
                />
              </InputGroup>
              <div className="field-error">
                {formik.touched.Login && formik.errors.Login
                  ? formik.errors.Login
                  : ""}
              </div>
            </FormGroup>
            <FormGroup
              className={`field-wrapper ${
                formik.touched.Password && formik.errors.Password
                  ? "has-error"
                  : ""
              }`}
            >
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Пароль"
                  type="password"
                  name="Password"
                  autoComplete="nope"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Password}
                />
              </InputGroup>
              <div className="field-error">
                {formik.touched.Password && formik.errors.Password
                  ? formik.errors.Password
                  : ""}
              </div>
            </FormGroup>
          </div>
          <div className="email-protocols d-flex justify-content-between mt-2">
            <div className="flex-fill">
              <h4>SMTP</h4>
              <FormGroup
                className={`field-wrapper ${
                  formik.touched.SmtpHost && formik.errors.SmtpHost
                    ? "has-error"
                    : ""
                } mb-0`}
              >
                <InputGroup className="input-group-alternative mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-world-2" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Хост"
                    type="text"
                    name="SmtpHost"
                    autoComplete="nope"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.SmtpHost}
                  />
                </InputGroup>
                <div className="field-error">
                  {formik.touched.SmtpHost && formik.errors.SmtpHost
                    ? formik.errors.SmtpHost
                    : ""}
                </div>
              </FormGroup>
              <FormGroup
                className={`field-wrapper ${
                  formik.touched.SmtpPort && formik.errors.SmtpPort
                    ? "has-error"
                    : ""
                } mb-0`}
              >
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tag" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Порт"
                    type="text"
                    name="SmtpPort"
                    autoComplete="nope"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.SmtpPort}
                  />
                </InputGroup>
                <div className="field-error">
                  {formik.touched.SmtpPort && formik.errors.SmtpPort
                    ? formik.errors.SmtpPort
                    : ""}
                </div>
              </FormGroup>
            </div>
            <div className="email-protocol-separator" />
            <div className="flex-fill">
              <h4>IMAP</h4>
              <FormGroup
                className={`field-wrapper ${
                  formik.touched.ImapHost && formik.errors.ImapHost
                    ? "has-error"
                    : ""
                } mb-0`}
              >
                <InputGroup className="input-group-alternative mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-world-2" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Хост"
                    type="text"
                    name="ImapHost"
                    autoComplete="nope"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ImapHost}
                  />
                </InputGroup>
                <div className="field-error">
                  {formik.touched.ImapHost && formik.errors.ImapHost
                    ? formik.errors.ImapHost
                    : ""}
                </div>
              </FormGroup>
              <FormGroup
                className={`field-wrapper ${
                  formik.touched.ImapPort && formik.errors.ImapPort
                    ? "has-error"
                    : ""
                } mb-0`}
              >
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tag" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Порт"
                    type="text"
                    name="ImapPort"
                    autoComplete="nope"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ImapPort}
                  />
                </InputGroup>
                <div className="field-error">
                  {formik.touched.ImapPort && formik.errors.ImapPort
                    ? formik.errors.ImapPort
                    : ""}
                </div>
              </FormGroup>
            </div>
          </div>
          <div className="position-relative d-flex align-items-center mt-4">
            <div className="flex-fill d-flex justify-content-end pr-3 server-error">
              {resultError}
            </div>
            <div>
              {isChange && (
                <Button
                  color="danger"
                  data-dismiss="modal"
                  type="button"
                  outline
                  onClick={onClose}
                >
                  Отмена
                </Button>
              )}
              <Button
                color="primary"
                type="button"
                onClick={formik.handleSubmit}
                disabled={isLoading}
                className="test-save-btn"
              >
                {isLoading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  " Тест и сохранить"
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
