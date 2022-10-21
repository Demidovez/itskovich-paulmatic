import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RegisterForm.scss";
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

const RegisterForm = ({ className = "" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [trySignUp, { data: signUpResponse, error, isFetching }] =
    useLazyTrySignUpQuery();

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
        setIsLoading(false);
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

  const formik = useFormik({
    initialValues: {
      username: "",
      useremail: "",
      directorUsername: "",
      password: "",
      company: "",
      agree: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле!"),
      useremail: Yup.string()
        .email("Неверный E-mail!")
        .required("Обязательное поле!"),
      directorUsername: Yup.string().email("Неверный E-mail!"),
      password: Yup.string()
        .min(5, "Требуется минимум 5 символов")
        .required("Обязательное поле!"),
      company: Yup.string().required("Обязательное поле!"),
      agree: Yup.boolean().oneOf([true], "Обязательное поле!"),
    }),
    onSubmit: (values) => {
      trySignUp({
        fullName: values.username,
        username: values.useremail,
        password: values.password,
        // company: values.company,
        directorUsername: values.directorUsername,
      });
    },
  });

  return (
    <Form
      role="form"
      className={`register-form-component ${className}`}
      onSubmit={formik.handleSubmit}
    >
      <FormGroup
        className={`field-wrapper ${
          formik.touched.username && formik.errors.username ? "has-error" : ""
        }`}
      >
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-hat-3" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Name"
            type="text"
            name="username"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </InputGroup>
        <div className="field-error">
          {formik.touched.username && formik.errors.username
            ? formik.errors.username
            : " "}
        </div>
      </FormGroup>
      <FormGroup
        className={`field-wrapper ${
          formik.touched.useremail && formik.errors.useremail ? "has-error" : ""
        }`}
      >
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="E-mail"
            type="text"
            name="useremail"
            autoComplete="nope"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.useremail}
          />
        </InputGroup>
        <div className="field-error">
          {formik.touched.useremail && formik.errors.useremail
            ? formik.errors.useremail
            : ""}
        </div>
      </FormGroup>
      <FormGroup
        className={`field-wrapper ${
          formik.touched.password && formik.errors.password ? "has-error" : ""
        }`}
      >
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="nope"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </InputGroup>
        <div className="field-error">
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""}
        </div>
      </FormGroup>
      <FormGroup
        className={`field-wrapper ${
          formik.touched.company && formik.errors.company ? "has-error" : ""
        }`}
      >
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-briefcase-24" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Company"
            type="text"
            name="company"
            autoComplete="nope"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.company}
          />
        </InputGroup>
        <div className="field-error">
          {formik.touched.company && formik.errors.company
            ? formik.errors.company
            : ""}
        </div>
      </FormGroup>
      <FormGroup
        className={`field-wrapper ${
          formik.touched.directorUsername && formik.errors.directorUsername
            ? "has-error"
            : ""
        }`}
      >
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Director E-mail"
            type="text"
            name="directorUsername"
            autoComplete="nope"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.directorUsername}
          />
        </InputGroup>
        <div className="field-error">
          {formik.touched.directorUsername && formik.errors.directorUsername
            ? formik.errors.directorUsername
            : ""}
        </div>
      </FormGroup>
      <Row className="my-4">
        <Col
          xs="12"
          className={`field-wrapper ${
            formik.touched.agree && formik.errors.agree ? "has-error" : ""
          }`}
        >
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
              className="custom-control-input"
              id="customCheckRegister"
              type="checkbox"
              name="agree"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agree}
            />
            <label
              className="custom-control-label"
              htmlFor="customCheckRegister"
            >
              <span className="text-muted">
                I agree with the{" "}
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </span>
            </label>
            <div className="field-error">
              {formik.touched.agree && formik.errors.agree
                ? formik.errors.agree
                : ""}
            </div>
          </div>
        </Col>
      </Row>
      <div className="text-center position-relative">
        <div className="server-error">{resultError ? resultError : ""}</div>
        <Button
          className="mt-4"
          color="primary"
          type="button"
          onClick={formik.handleSubmit}
          disabled={isLoading}
          style={{ minWidth: 150 }}
        >
          {isLoading ? <Spinner color="white" size="sm" /> : "Create account"}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
