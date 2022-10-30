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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyTrySaveEmailServerQuery } from "store/api/login";
import { setInMailSettingsStatus } from "store/slices/commonSlice";
import { useSelector } from "react-redux";

const URL_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const EmailForm = ({
  className = "",
  isChange = false,
  server = {},
  onClose,
  onChange,
}) => {
  const dispatch = useDispatch();

  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLogin, setCurrentLogin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const { Login, Password } = useSelector(
    (state) => state.common.Account.InMailSettings || {}
  );

  useEffect(() => {
    setCurrentLogin(Login);
    setCurrentPassword(Password);
  }, [Login, Password]);

  const [trySaveEmailServer, { data: emailServerResponse, isFetching }] =
    useLazyTrySaveEmailServerQuery();

  useEffect(() => {
    if (!isFetching && emailServerResponse) {
      if ((emailServerResponse.result || {}).InMailSettings) {
        dispatch(
          setInMailSettingsStatus({
            ...emailServerResponse.InMailSettings,
            Creds: {
              Name: server.Creds.Name,
              Id: server.Creds.Id,
            },
          })
        );
        localStorage.setItem(
          "Account",
          JSON.stringify({
            ...emailServerResponse,
            InMailSettings: {
              ...emailServerResponse.InMailSettings,
              Creds: {
                Name: server.Creds.Name,
                Id: server.Creds.Id,
              },
            },
          })
        );
        setIsLoading(false);
        setResultError("");
        onClose();
      } else if (emailServerResponse.error) {
        setResultError(emailServerResponse.error.message);
        setIsLoading(false);
      } else {
        setResultError("Ошибка! Попробуйте позже...");
        setIsLoading(false);
      }
    } else if (isFetching) {
      setIsLoading(true);
    }
  }, [emailServerResponse, isFetching, server]);

  console.log(emailServerResponse);

  return (
    <Formik
      initialValues={{
        Login: server.Login || currentLogin || "",
        Password: server.Password || currentPassword || "",
        SmtpPort: server.SmtpPort || "",
        ImapPort: server.ImapPort || "",
        SmtpHost: server.SmtpHost || "",
        ImapHost: server.ImapHost || "",
      }}
      enableReinitialize
      validationSchema={Yup.object({
        Login: Yup.string()
          .email("Неверный E-mail")
          .required("Обязательное поле"),
        Password: Yup.string().required("Обязательное поле"),
        SmtpPort: Yup.number()
          .integer("Требуется целое число")
          .typeError("Требуется число")
          .min(1, "Требуется число больше 0")
          .required("Обязательное поле"),
        ImapPort: Yup.number()
          .integer("Требуется целое число")
          .typeError("Требуется число")
          .min(1, "Требуется число больше 0")
          .required("Обязательное поле"),
        SmtpHost: Yup.string()
          .matches(URL_REGEX, "Требуется доменное имя сервера")
          .required("Обязательное поле"),
        ImapHost: Yup.string()
          .matches(URL_REGEX, "Требуется доменное имя сервера")
          .required("Обязательное поле"),
      })}
      onSubmit={(values) => {
        setResultError("");
        trySaveEmailServer({
          ...values,
          ImapPort: +values.ImapPort,
          SmtpPort: +values.SmtpPort,
        });
      }}
    >
      {(formik) => (
        <Form
          role="form"
          className={`email-form-component ${className} mt-3`}
          onSubmit={formik.handleSubmit}
          onChange={onChange}
        >
          <div className="d-flex">
            <FormGroup
              className={`field-wrapper ${
                formik.touched.Login && formik.errors.Login ? "has-error" : ""
              } mr-4 flex-fill`}
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
                  autoComplete="email"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setCurrentLogin(e.target.value);
                  }}
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
              } flex-fill`}
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
                  autoComplete="current-password"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setCurrentPassword(e.target.value);
                  }}
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
