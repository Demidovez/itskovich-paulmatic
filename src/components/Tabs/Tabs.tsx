import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useLazyGetCompaniesInfoQuery } from '~src/store/api/companies';
import { useLazyGetPersonsInfoQuery } from '~src/store/api/persons';
import { checkFilters } from '~src/store/slices/b2bFilterSlice';
import { setShowTariffModal } from '~src/store/slices/commonSlice';
import { addTables } from '~src/store/slices/tablesSlice';
import { setActiveTable } from '~src/store/slices/tablesSlice';

import './Tabs.scss';

const Tabs = ({ tabs, activeTable, className }) => {
  const { companies, persons } = tabs;

  const [ getCompaniesInfo, { data: companiesInfo } ] =
    useLazyGetCompaniesInfoQuery();

  const [ getPersonsInfo, { data: personsInfo } ] = useLazyGetPersonsInfoQuery();

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
        checkFilters({ names: [ persons.info.name, companies.info.name ]}),
      );
    }
  }, [ companies, persons ]);

  useEffect(() => {
    if (companiesInfo && personsInfo) {
      const companies = {
        link: '/' + companiesInfo.name,
        label: companiesInfo.description,
        info: companiesInfo,
      };

      const persons = {
        link: '/' + personsInfo.name,
        label: personsInfo.description,
        info: personsInfo,
      };

      dispatch(
        addTables([
          { table: 'persons', data: persons },
          { table: 'companies', data: companies },
        ]),
      );
    }
  }, [ companiesInfo, personsInfo ]);

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
                id={'radio-1'}
                name="tabs"
                checked={activeTable === persons.info.name}
                onChange={() => onActiveTable(persons.info.name)}
              />
              <label className="tab" htmlFor={'radio-1'}>
                {persons.label}
              </label>
            </Fragment>
          )}
          {Object.keys(companies).length > 0 && (
            <Fragment>
              <input
                type="radio"
                id={'radio-2'}
                name="tabs"
                checked={activeTable === companies.info.name}
                onChange={() => onActiveTable(companies.info.name)}
              />
              <label className="tab" htmlFor={'radio-2'}>
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
