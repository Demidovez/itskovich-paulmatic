import { useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { useLazyGetPersonsInfoQuery } from "store/api/persons";
import { useLazyGetCompaniesInfoQuery } from "store/api/companies";
import { checkFilters } from "store/slices/b2bFilterSlice";
import "./Tabs.scss";
import { useDispatch } from "react-redux";
import { addTables } from "store/slices/tablesSlice";

const Tabs = ({ parentPath, tabs }) => {
  const { companies, persons } = tabs;

  const [getCompaniesInfo, { data: companiesInfo }] =
    useLazyGetCompaniesInfoQuery();

  const [getPersonsInfo, { data: personsInfo }] = useLazyGetPersonsInfoQuery();

  const [checkedTab, setCheckedTab] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      Object.keys(companies).length === 0 &&
      Object.keys(persons).length === 0
    ) {
      getCompaniesInfo();
      getPersonsInfo();
    } else if (
      Object.keys(companies).length > 0 &&
      Object.keys(persons).length > 0
    ) {
      dispatch(
        checkFilters({ names: [companies.info.name, persons.info.name] })
      );
    }
  }, [companies, persons]);

  useEffect(() => {
    if (companiesInfo && personsInfo) {
      const companies = {
        link: "/" + companiesInfo.name,
        label: companiesInfo.description,
        info: companiesInfo,
      };

      const persons = {
        link: "/" + personsInfo.name,
        label: personsInfo.description,
        info: personsInfo,
      };

      dispatch(
        addTables([
          { table: "companies", data: companies },
          { table: "persons", data: persons },
        ])
      );
    }
  }, [companiesInfo, personsInfo]);

  useEffect(() => {
    if (checkedTab !== null) {
      setTimeout(() => history.replace(parentPath + tabs[checkedTab].link), 0);
    }
  }, [checkedTab]);

  return (
    <>
      <div className="tabs-component">
        <div className="tabs">
          {Object.keys(companies).length > 0 && (
            <Fragment key={companies.link}>
              <input
                type="radio"
                id={`radio-1`}
                name="tabs"
                checked={
                  checkedTab === null || checkedTab === companies.info.name
                }
                onChange={() => setCheckedTab(companies.info.name)}
              />
              <label className="tab" htmlFor={`radio-1`}>
                {companies.label}
              </label>
            </Fragment>
          )}

          {Object.keys(persons).length > 0 && (
            <Fragment key={persons.link}>
              <input
                type="radio"
                id={`radio-2`}
                name="tabs"
                checked={checkedTab === persons.info.name}
                onChange={() => setCheckedTab(persons.info.name)}
              />
              <label className="tab" htmlFor={`radio-2`}>
                {persons.label}
              </label>
            </Fragment>
          )}

          <span className="glider"></span>
        </div>
      </div>
    </>
  );
};

export default Tabs;
