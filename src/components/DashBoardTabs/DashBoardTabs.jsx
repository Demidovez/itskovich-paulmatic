import { Fragment, useEffect, useState } from "react";
import "./DashBoardTabs.scss";
import { useDispatch } from "react-redux";
import { BsFillStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { setActiveTabId } from "store/slices/dashboardSlice";
import { useLazyGetDashboardStatsQuery } from "store/api/dashboard";
import { setActiveAccountId } from "store/slices/dashboardSlice";

const DashBoardTabs = ({ className = "", data = {} }) => {
  const dispatch = useDispatch();
  const [persons, setPersons] = useState([
    {
      id: 0,
      label: "Вы",
    },
  ]);

  const currentAccountId = useSelector((state) => state.common.Account.id);
  const activeAccountId = useSelector(
    (state) => state.dashboard.activeAccountId
  );

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

  return (
    <>
      <div className="dashboard-tabs-component">
        <div className={`${className} tabs`}>
          {persons.map((person, index) => (
            <Fragment key={index}>
              <input
                type="radio"
                id={`radio-${index}`}
                name="tabs"
                checked={(activeAccountId || currentAccountId) === person.id}
                onChange={() => dispatch(setActiveAccountId(person.id))}
              />
              <label
                className={`tab ${
                  (activeAccountId || currentAccountId) === person.id ||
                  person.id === 0
                    ? "active"
                    : ""
                }`}
                htmlFor={`radio-${index}`}
              >
                {index === 0 ? (
                  <BsFillStarFill style={{ marginRight: 5 }} />
                ) : null}
                <div>{person.label}</div>
              </label>
            </Fragment>
          ))}

          <span className="glider"></span>
        </div>
      </div>
    </>
  );
};

export default DashBoardTabs;
