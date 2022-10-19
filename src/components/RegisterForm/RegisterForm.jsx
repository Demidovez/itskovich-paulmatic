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
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RegisterForm.scss";

const RegisterForm = ({ className = "" }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      useremail: "",
      password: "",
      company: "",
      agree: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле!"),
      useremail: Yup.string()
        .email("Неверный E-mail!")
        .required("Обязательное поле!"),
      password: Yup.string()
        .min(5, "Требуется минимум 5 символов")
        .required("Обязательное поле!"),
      company: Yup.string().required("Обязательное поле!"),
      agree: Yup.boolean().oneOf([true], "Обязательное поле!"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
      <div className="text-center">
        <Button
          className="mt-4"
          color="primary"
          type="button"
          onClick={formik.handleSubmit}
        >
          Create account
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
