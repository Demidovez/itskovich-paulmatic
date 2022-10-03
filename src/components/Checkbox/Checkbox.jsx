import { useMemo } from "react";
import "./Checkbox.scss";

const { Label } = require("reactstrap");

const Checkbox = ({
  label,
  scale = 1,
  id,
  checked,
  onChange,
  className = "",
  labelClassName = "",
  isStopPropagation = true,
}) => {
  return (
    <div className={`checkbox-component ${className}`}>
      <div
        className="pl-0 custom-control checkbox-contact custom-checkbox"
        onClick={isStopPropagation ? (e) => e.stopPropagation() : null}
      >
        <input
          className="custom-control-input"
          checked={checked}
          onChange={onChange}
          id={"check_" + id}
          type="checkbox"
        />
        <Label
          className="custom-control-label"
          htmlFor={"check_" + id}
          style={{ transform: `scale(${scale})` }}
        ></Label>
      </div>
      <label htmlFor={"check_" + id} className={`${labelClassName}`}>
        {label || null}
      </label>
    </div>
  );
};

export default Checkbox;
