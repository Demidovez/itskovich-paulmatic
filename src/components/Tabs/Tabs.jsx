import { useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import "./Tabs.scss";

const Tabs = ({ data, parentPath }) => {
  const [checkedIndex, setCheckedIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.replace(parentPath + data[checkedIndex].link), 0);
  }, [checkedIndex]);

  // TODO: radio-1 radio-2 radio-3 radio-4 - Сделать динамическими в SCSS
  return (
    <>
      <div className="tabs-component">
        <div className="tabs">
          {data.map((tab, index) => (
            <Fragment key={tab.link}>
              <input
                type="radio"
                id={`radio-${index + 1}`}
                name="tabs"
                checked={index === checkedIndex}
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
