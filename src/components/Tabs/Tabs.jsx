import { useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
import "./Tabs.scss";

const Tabs = ({ data, parentPath }) => {
  const [checkedIndex, setCheckedIndex] = useState(0);

  const history = useHistory();

  const handleChecked = (index, link) => {
    setCheckedIndex(index);
    history.replace(parentPath + link);
  };

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
                onChange={() => handleChecked(index, tab.link)}
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
