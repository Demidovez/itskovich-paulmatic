import { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Modal, Row } from 'reactstrap';

import EmailForm from '~src/components/EmailForm/EmailForm';
import EmailIcon from '~src/components/EmailIcon/EmailIcon';
import useYouSure from '~src/hooks/useYouSure';
import { useLazyGetTariffsQuery } from '~src/store/api/common';
import { setTariffs } from '~src/store/slices/commonSlice';

import './ModalTariff.scss';

const PRICE = {
  0: 'Бесплатно',
  '-1': 'Индивидуально',
};

const ModalTariff = ({ onClose, description = 'Измените подписку' }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const tariffs = useSelector((state) => state.common.tariffs);
  const currentTariff = useSelector(
    (state) => state.common.Account.Tariff.Creds.Name,
  );

  const [ getTariffs, { data: tariffResponse } ] = useLazyGetTariffsQuery();

  useEffect(() => {
    getTariffs();
  }, []);

  useEffect(() => {
    if (tariffResponse) {
      dispatch(setTariffs(tariffResponse));
    }
  }, [tariffResponse]);

  return (
    <Modal
      className="modal-tariff-component modal-dialog-centered"
      modalClassName="d-flex"
      toggle={onClose}
      isOpen={true}
      style={{
        maxWidth: 1100,
        minWidth: 700,
      }}
    >
      <div className="modal-header p-4 align-items-center">
        <div className="d-flex align-items-center">
          <h5 className="modal-title" id="exampleModalLabel">
            {/* Тариф */}
          </h5>
        </div>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={onClose}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body p-0 px-4">
        <div className="tariffs-block">
          <Container className="pb-6" fluid>
            <Row>
              <Col lg="12">
                <div className="pt-0 ">
                  <div className="title">
                    <h4>Повысьте свои продажи</h4>
                    <p>{description}</p>
                  </div>
                  <div className="content">
                    {tariffs.map((tariff) => (
                      <div key={tariff.Creds.Id} className="tariff">
                        <div
                          className="header"
                          style={{ backgroundColor: tariff.color || '#636bff' }}
                        >
                          <h5>{tariff.Creds.Name}</h5>
                          <div
                            className={`price ${
                              tariff.Price === -1 ? 'long' : ''
                            }`}
                          >
                            {PRICE[tariff.Price] || tariff.Price + ' ₽'}
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
                                  backgroundColor: tariff.color || '#636bff',
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
            </Row>
          </Container>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTariff;
