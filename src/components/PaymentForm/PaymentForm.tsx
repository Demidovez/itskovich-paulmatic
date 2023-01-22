import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Spinner,
} from 'reactstrap';
import * as Yup from 'yup';

import { useLazyTryUpdatePaymentQuery } from '~src/store/api/login';
import { updatePayment } from '~src/store/slices/commonSlice';

import './PaymentForm.scss';

const NAME_REGEX = /^[a-zA-Z\s]*$/;

const PaymentForm = ({ className = '' }) => {
  const dispatch = useDispatch();
  const [ resultError, setResultError ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const [ tryUpdatePayment, { data: updatePaymentResponse, error, isFetching } ] =
    useLazyTryUpdatePaymentQuery();

  useEffect(() => {
    if (!isFetching && updatePaymentResponse) {
      if ((updatePaymentResponse || {}).username) {
        dispatch(
          updatePayment({
            ...updatePaymentResponse,
          }),
        );
        // localStorage.setItem(
        //   "Account",
        //   JSON.stringify({
        //     ...updateAccountResponse,
        //   })
        // );
        setIsLoading(false);
        setResultError('');
      } else {
        setResultError('Ошибка! Попробуйте еще раз... ');
        setIsLoading(false);
      }
    } else if (isFetching) {
      setIsLoading(true);
    }
  }, [ updatePaymentResponse, isFetching ]);

  useEffect(() => {
    if (error && error.status !== 200) {
      setResultError(
        error &&
          (error.data.message ||
            error.data.error.message ||
            'Ошибка! Попробуйте еще раз...'),
      );
      setIsLoading(false);
    } else {
      setResultError('');
    }
  }, [ JSON.stringify(error), isFetching ]);

  const Account = useSelector((state) => state.common.Account || {});

  const formik = useFormik({
    initialValues: {
      number: Account.number || '',
      name: Account.name || '',
      date: Account.date || '',
      ccv: Account.ccv || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      number: Yup.number()
        .test(
          'len',
          'Требуется 16 цифр',
          (val) => val && val.toString().length === 16,
        )
        .integer('Требуется целое число')
        .typeError('Требуется число')
        .required('Обязательное поле'),
      name: Yup.string()
        .matches(NAME_REGEX, 'только буквы латинского алфавита')
        .required('Обязательное поле'),
      date: Yup.string().required('Обязательное поле'),
      ccv: Yup.number()
        .test(
          'len',
          'Требуется трехзначное число',
          (val) => val && val.toString().length === 3,
        )
        .integer('Требуется целое число')
        .typeError('Требуется число')
        .required('Обязательное поле'),
    }),
    onSubmit: (values) => {
      tryUpdatePayment({
        number: values.number,
        name: values.name,
        date: values.date,
        ccv: +values.ccv,
      });
      setResultError('');
    },
  });

  return (
    <div className="payment-form-component" style={{ background: '#f8f8ff' }}>
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
                      formik.touched.name && formik.errors.name
                        ? 'has-error'
                        : ''
                    } mb-3`}
                  >
                    <span>Имя владельца карты</span>
                    <Input
                      placeholder="Имя владельца карты"
                      type="text"
                      name="name"
                      autoComplete="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name.toUpperCase()}
                      className="py-2"
                    />

                    <div className="field-error">
                      {formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : ' '}
                    </div>
                  </FormGroup>
                  <FormGroup
                    className={`field-wrapper ${
                      formik.touched.number && formik.errors.number
                        ? 'has-error'
                        : ''
                    } mb-3`}
                  >
                    <span>Номер карты</span>
                    <Input
                      placeholder="Номер карты"
                      type="text"
                      name="number"
                      autoComplete="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.number}
                      className="py-2"
                    />

                    <div className="field-error">
                      {formik.touched.number && formik.errors.number
                        ? formik.errors.number
                        : ' '}
                    </div>
                  </FormGroup>
                  <div
                    className="d-flex justify-content-between"
                    style={{ gap: 40 }}
                  >
                    <FormGroup
                      className={`field-wrapper ${
                        formik.touched.date && formik.errors.date
                          ? 'has-error'
                          : ''
                      } mb-3 flex-fill`}
                    >
                      <span>Срок действия</span>
                      <Input
                        placeholder="Срок действия"
                        type="text"
                        name="date"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                      />

                      <div className="field-error">
                        {formik.touched.date && formik.errors.date
                          ? formik.errors.date
                          : ''}
                      </div>
                    </FormGroup>
                    <FormGroup
                      className={`field-wrapper ${
                        formik.touched.ccv && formik.errors.ccv
                          ? 'has-error'
                          : ''
                      } mb-3 flex-fill`}
                    >
                      <span>CCV</span>
                      <Input
                        placeholder="CCV"
                        type="password"
                        name="ccv"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ccv}
                      />

                      <div className="field-error">
                        {formik.touched.ccv && formik.errors.ccv
                          ? formik.errors.ccv
                          : ''}
                      </div>
                    </FormGroup>
                  </div>
                </Form>
                <div className="position-relative mt-4 d-flex justify-content-end align-items-center">
                  <div className="server-error">
                    {resultError ? resultError : ''}
                  </div>
                  <Button
                    className=""
                    color="primary"
                    type="button"
                    onClick={formik.handleSubmit}
                    disabled={isLoading}
                    style={{
                      background: '#4450ff',
                      borderRadius: 40,
                      minWidth: 120,
                    }}
                  >
                    {isLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      'Сохранить'
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
