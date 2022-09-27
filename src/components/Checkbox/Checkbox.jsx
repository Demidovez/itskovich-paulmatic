import { useMemo } from "react";
import "./Checkbox.scss";

const { Label } = require("reactstrap");

const Checkbox = ({ label, scale = 1 }) => {
  const id = useMemo(() => new Date().getTime(), []);

  return (
    <div className="checkbox-component">
      <div className="pl-0 custom-control checkbox-contact custom-checkbox">
        <input
          className="custom-control-input"
          // checked={selectedIds.includes(company.id)}
          // onChange={() => onSelectId(company.id)}
          id={"check_" + id}
          type="checkbox"
        />
        <Label
          className="custom-control-label"
          htmlFor={"check_" + id}
          style={{ transform: `scale(${scale})` }}
        ></Label>
      </div>
      <label htmlFor={"check_" + id}>{label || null}</label>
    </div>
  );
};

export default Checkbox;
