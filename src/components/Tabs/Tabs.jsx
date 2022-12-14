import { Fragment, useState, useEffect } from "react";
import { useLazyGetPersonsInfoQuery } from "store/api/persons";
import { useLazyGetCompaniesInfoQuery } from "store/api/companies";
import { checkFilters } from "store/slices/b2bFilterSlice";
import "./Tabs.scss";
import { useDispatch } from "react-redux";
import { addTables } from "store/slices/tablesSlice";
import { setActiveTable } from "store/slices/tablesSlice";
import { setShowTariffModal } from "store/slices/commonSlice";

const Tabs = ({ tabs, activeTable, className }) => {
  const { companies, persons } = tabs;

  const [getCompaniesInfo, { data: companiesInfo }] =
    useLazyGetCompaniesInfoQuery();

  const [getPersonsInfo, { data: personsInfo }] = useLazyGetPersonsInfoQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      Object.keys(companies).length === 0 &&
      Object.keys(persons).length === 0
    ) {
      getPersonsInfo();
      getCompaniesInfo();
    } else if (
      Object.keys(companies).length > 0 &&
      Object.keys(persons).length > 0
    ) {
      dispatch(
        checkFilters({ names: [persons.info.name, companies.info.name] })
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
          { table: "persons", data: persons },
          { table: "companies", data: companies },
        ])
      );
    }
  }, [companiesInfo, personsInfo]);

  const onActiveTable = (table) => {
    dispatch(setActiveTable(table));
  };

  return (
    <>
      <div className="tabs-component">
        <div className={`${className} tabs`}>
          {Object.keys(persons).length > 0 && (
            <Fragment>
              <input
                type="radio"
                id={`radio-1`}
                name="tabs"
                checked={activeTable === persons.info.name}
                onChange={() => onActiveTable(persons.info.name)}
              />
              <label className="tab" htmlFor={`radio-1`}>
                {persons.label}
              </label>
            </Fragment>
          )}
          {Object.keys(companies).length > 0 && (
            <Fragment>
              <input
                type="radio"
                id={`radio-2`}
                name="tabs"
                checked={activeTable === companies.info.name}
                onChange={() => onActiveTable(companies.info.name)}
              />
              <label className="tab" htmlFor={`radio-2`}>
                {companies.label}
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
