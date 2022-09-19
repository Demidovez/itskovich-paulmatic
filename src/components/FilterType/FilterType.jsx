import { useEffect, useState } from "react";
import { Card, CardBody, Label, Input, FormGroup } from "reactstrap";
import Selector from "../Selector/Selector";

const FilterType = ({ data, onChange, isDisabled }) => {
  switch (data.Type) {
    case "choise":
      return (
        <FormGroup>
          <p className="mb-1">
            <strong>{data.Description}</strong>
          </p>
          <div className="mb-3">
            <Selector
              data={data}
              onSelect={(value) => onChange(data.Name, value)}
              isDisabled={isDisabled}
            />
          </div>
        </FormGroup>
      );
    case "flag":
      return (
        <FormGroup check className="mb-2">
          <Input
            type="checkbox"
            style={{ width: "17px", height: "17px", marginTop: "4px" }}
          />
          <Label check className="ml-2">
            {data.Description}
          </Label>
        </FormGroup>
      );
    default:
      return null;
  }
};

export default FilterType;
