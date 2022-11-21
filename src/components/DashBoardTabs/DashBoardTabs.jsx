import { Fragment, useEffect, useState } from "react";
import "./DashBoardTabs.scss";
import { useDispatch } from "react-redux";
import { BsFillStarFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { setActiveTabId } from "store/slices/dashboardSlice";
import { useLazyGetDashboardStatsQuery } from "store/api/dashboard";
import { setActiveAccountId } from "store/slices/dashboardSlice";
import { Col, Container, Row } from "reactstrap";
import ModalYouSure from "components/ModalYouSure/ModalYouSure";
import { useLazyTryDeleteSubordinateQuery } from "store/api/login";

const DashBoardTabs = ({ className = "", data = {} }) => {
  const dispatch = useDispatch();
  const [isAskSure, setIsAskSure] = useState(false);
  const [persons, setPersons] = useState([
    {
      id: 0,
      label: "Вы",
    },
  ]);

  const { id: currentAccountId, Subordinates } = useSelector(
    (state) => state.common.Account
  );
  const activeAccountId = useSelector(
    (state) => state.dashboard.activeAccountId
  );

  const [tryDeleteSubordinate] = useLazyTryDeleteSubordinateQuery();

  useEffect(() => {
    if (Object.values(data).length) {
      setPersons(
        [
          ...Object.entries(data).map(([accountID, data]) => ({
            label: +accountID === currentAccountId ? "Вы" : data.AccountName,
            order: +accountID === currentAccountId ? 1 : 0,
            id: +accountID,
          })),
        ].sort((p1, p2) => p2.order - p1.order)
      );
    }
  }, [Object.values(data).length]);

  console.log(persons);

  const onDeleteSubmit = () => {
    setIsAskSure(false);
    tryDeleteSubordinate(activeAccountId);
  };

  return (
    <>
      {(Subordinates || []).length > 0 ? (
        <Container className="" fluid>
          <Row className="">
            <Col className="py-4">
              <div className="dashboard-tabs-component">
                <div className={`${className} tabs`}>
                  {persons.map((person, index) => (
                    <Fragment key={index}>
                      <input
                        type="radio"
                        id={`radio-${index}`}
                        name="tabs"
                        checked={
                          (activeAccountId || currentAccountId) === person.id
                        }
                        onChange={() => dispatch(setActiveAccountId(person.id))}
                      />
                      <label
                        className={`tab ${
                          (activeAccountId || currentAccountId) === person.id ||
                          person.id === 0
                            ? "active"
                            : "inactive"
                        }`}
                        htmlFor={`radio-${index}`}
                      >
                        {index === 0 ? (
                          <BsFillStarFill style={{ marginRight: 5 }} />
                        ) : null}
                        <div>{person.label}</div>
                        {index !== 0 ? (
                          <MdOutlineClose
                            style={{ marginRight: 5 }}
                            onClick={() => setIsAskSure(true)}
                          />
                        ) : null}
                      </label>
                    </Fragment>
                  ))}

                  <span className="glider"></span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : null}
      <ModalYouSure
        isShow={isAskSure}
        title={"Удалить аккаунт"}
        text={"Этот аккаунт будет удален из списка Ваших подчиненных. Удалить?"}
        onAgree={onDeleteSubmit}
        onCancel={() => {
          setIsAskSure(false);
        }}
      />
    </>
  );
};

export default DashBoardTabs;
