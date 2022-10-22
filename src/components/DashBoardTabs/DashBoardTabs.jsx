import { Fragment, useState, useEffect } from "react";
import { useLazyGetPersonsInfoQuery } from "store/api/persons";
import { useLazyGetCompaniesInfoQuery } from "store/api/companies";
import { checkFilters } from "store/slices/b2bFilterSlice";
import "./DashBoardTabs.scss";
import { useDispatch } from "react-redux";
import { addTables } from "store/slices/tablesSlice";
import { setActiveTable } from "store/slices/tablesSlice";
import { BsFillStarFill } from "react-icons/bs";

const DashBoardTabs = ({ className = "" }) => {
  const [persons] = useState([
    {
      id: 0,
      link: "/",
      label: "Вы",
    },
    {
      id: 1,
      link: "/",
      label: "Николай Белов",
    },
    {
      id: 2,
      link: "/",
      label: "Мария пучкова",
    },
    {
      id: 3,
      link: "/",
      label: "Юра Синцов",
    },
  ]);

  const [activePersonId, setActivePersonId] = useState(0);

  return (
    <>
      <div className="dashboard-tabs-component">
        <div className={`${className} tabs`}>
          {persons.map((person, index) => (
            <Fragment key={person.id}>
              <input
                type="radio"
                id={`radio-${person.id}`}
                name="tabs"
                checked={activePersonId === person.id}
                onChange={() => setActivePersonId(person.id)}
              />
              <label
                className={`tab ${
                  activePersonId === person.id ? "active" : ""
                }`}
                htmlFor={`radio-${person.id}`}
              >
                {index === 0 ? (
                  <BsFillStarFill style={{ marginRight: 5 }} />
                ) : null}
                {person.label}
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
