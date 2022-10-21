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
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginForm.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveAccount } from "store/slices/commonSlice";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { setCommonInfoTasks } from "store/slices/commonSlice";
import { setCommonInfoHtmlTemplates } from "store/slices/commonSlice";
import { setFolders } from "store/slices/commonSlice";
import { setChats } from "store/slices/commonSlice";
import { useHistory } from "react-router-dom";
import { useLazyTryLognInQuery } from "store/api/login";
import { ROUTES } from "routes";

const LoginForm = ({ className = "" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [tryLogin, { data: loginResponse, error, isFetching }] =
    useLazyTryLognInQuery();
  const [
    getCommonInfo,
    {
      data: commonData,
      error: errorCommonData,
      isFetching: isFetchingCommonData,
    },
  ] = useLazyGetCommonInfoQuery();

  useEffect(() => {
    if (!isFetching && loginResponse) {
      if ((loginResponse || {}).sessionToken) {
        dispatch(saveAccount(loginResponse));
        localStorage.setItem("Account", JSON.stringify(loginResponse));
        getCommonInfo();
      } else {
        setResultError("Неизвестная ошибка! Попробуйте позже... ");
        setIsLoading(false);
      }
    } else if (isFetching) {
      setIsLoading(true);
    }
  }, [loginResponse, isFetching]);

  useEffect(() => {
    if (
      (error && error.status !== 200) ||
      (errorCommonData && errorCommonData.status !== 200)
    ) {
      setResultError(
        (error &&
          error.data &&
          (error.data.message || error.data.error.message)) ||
          (errorCommonData &&
            errorCommonData.data &&
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
      history.push("/admin/" + commonData.Account.username + "/index");
      setIsLoading(true);
    } else if (isFetchingCommonData) {
      setIsLoading(true);
    }
  }, [isFetchingCommonData, commonData]);

  const formik = useFormik({
    initialValues: {
      useremail: "",
      password: "",
    },
    validationSchema: Yup.object({
      useremail: Yup.string()
        .email("Неверный E-mail!")
        .required("Обязательное поле!"),
      password: Yup.string()
        .min(5, "Требуется минимум 5 символов")
        .required("Обязательное поле!"),
    }),
    onSubmit: (values) => {
      tryLogin({
        username: values.useremail,
        password: values.password,
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
          formik.touched.useremail && formik.errors.useremail ? "has-error" : ""
        } mb-3`}
      >
        <span>E-mail</span>
        <Input
          placeholder="E-mail"
          type="text"
          name="useremail"
          autoComplete="nope"
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
          formik.touched.password && formik.errors.password ? "has-error" : ""
        } mb-3`}
      >
        <span>Пароль</span>
        <Input
          placeholder="Пароль"
          type="password"
          name="password"
          autoComplete="nope"
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
      <div className="text-center position-relative">
        <div className="server-error">{resultError ? resultError : ""}</div>
        <Button
          className="mt-4 w-100"
          color="primary"
          type="button"
          onClick={formik.handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner color="white" size="sm" /> : "Войти"}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
