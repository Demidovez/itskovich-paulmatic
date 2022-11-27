import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";

import "react-datetime/css/react-datetime.css";
import "./DateTimePicker.scss";

const DateTimePicker = ({ datetime, onDateTime }) => {
  return (
    <div className="datetimepicker-component">
      <span>Выберите дату </span>
      <FormGroup style={{ flex: 1 }}>
        <InputGroup className="input-group-alternative datetimepicker-input">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon>
          <ReactDatetime
            inputProps={{
              placeholder: "Дата и время",
            }}
            timeFormat={true}
            value={new Date(datetime)}
            initialValue={new Date(datetime)}
            onChange={(datetime) => onDateTime(datetime.format())}
          />
        </InputGroup>
      </FormGroup>
    </div>
  );
};

export default DateTimePicker;
