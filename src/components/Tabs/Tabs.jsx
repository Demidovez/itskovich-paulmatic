import { useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { useLazyGetPersonsInfoQuery } from "store/api/persons";
import { useLazyGetCompaniesInfoQuery } from "store/api/companies";
import { checkFilters } from "store/slices/b2bFilterSlice";
import "./Tabs.scss";
import { useDispatch } from "react-redux";
import { setTab } from "store/slices/tablesSlice";

const Tabs = ({ parentPath, tabs }) => {
  const [getCompaniesInfo, companiesInfo] = useLazyGetCompaniesInfoQuery({
    selectFromResult: ({ data }) => data,
  });

  const [getPersonsInfo, personsInfo] = useLazyGetPersonsInfoQuery({
    selectFromResult: ({ data }) => data,
  });

  const [checkedIndex, setCheckedIndex] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tabs.length === 0) {
      getCompaniesInfo();
      getPersonsInfo();
    }
  }, [tabs.length]);

  useEffect(() => {
    if (companiesInfo) {
      const companies = {
        id: 0,
        link: "/" + companiesInfo.name,
        label: companiesInfo.description,
        info: companiesInfo,
      };

      dispatch(setTab(companies));
    }
  }, [companiesInfo]);

  useEffect(() => {
    if (personsInfo) {
      const persons = {
        id: 1,
        link: "/" + personsInfo.name,
        label: personsInfo.description,
        info: personsInfo,
      };

      dispatch(setTab(persons));
    }
  }, [personsInfo]);

  useEffect(() => {
    if (tabs.length > 0 && checkedIndex !== null) {
      setTimeout(
        () => history.replace(parentPath + tabs[checkedIndex].link),
        0
      );
    }
  }, [checkedIndex, tabs.length]);

  useEffect(() => {
    if (tabs.length > 0) {
      dispatch(checkFilters({ names: tabs.map((tab) => tab.info.name) }));
    }
  }, [tabs.length]);

  return (
    <>
      <div className="tabs-component">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <Fragment key={tab.link}>
              <input
                type="radio"
                id={`radio-${index + 1}`}
                name="tabs"
                checked={index === (checkedIndex === null ? 0 : checkedIndex)}
                onChange={() => setCheckedIndex(index)}
              />
              <label className="tab" htmlFor={`radio-${index + 1}`}>
                {tab.label}
              </label>
            </Fragment>
          ))}
          <span className="glider"></span>
        </div>
      </div>
    </>
  );
};

export default Tabs;
