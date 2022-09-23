import { useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { useLazyGetPersonsInfoQuery } from "store/api/persons";
import { useLazyGetCompaniesInfoQuery } from "store/api/companies";
import { checkFilters } from "store/slices/b2bFilterSlice";
import "./Tabs.scss";
import { useDispatch } from "react-redux";

const Tabs = ({ data, parentPath, onTabs }) => {
  const [getCompaniesInfo, companiesInfo] = useLazyGetCompaniesInfoQuery({
    selectFromResult: ({ data }) => data,
  });

  const [getPersonsInfo, personsInfo] = useLazyGetPersonsInfoQuery({
    selectFromResult: ({ data }) => data,
  });

  const [tabs, setTabs] = useState([]);
  const [checkedIndex, setCheckedIndex] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getCompaniesInfo();
    getPersonsInfo();
  }, []);

  useEffect(() => {
    if (personsInfo && companiesInfo) {
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

      setTabs([companies, persons]);
    }
  }, [personsInfo, companiesInfo]);

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
      onTabs(tabs);

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
