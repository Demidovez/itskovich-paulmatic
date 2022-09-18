import { Link } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ data, parentPath }) => {
  return (
    <>
      {/* {data.map((tab) => (
        <Link
          to={parentPath + tab.link}
          className="btn btn-primary"
          key={tab.link}
        >
          {tab.label}
        </Link>
      ))} */}
      <div className="tabs-component">
        <div className="tabs">
          <input type="radio" id="radio-1" name="tabs" />
          <label className="tab" htmlFor="radio-1">
            Компании
          </label>
          <input type="radio" id="radio-2" name="tabs" />
          <label className="tab" htmlFor="radio-2">
            Люди
          </label>
          <span className="glider"></span>
        </div>
      </div>
    </>
  );
};

export default Tabs;
