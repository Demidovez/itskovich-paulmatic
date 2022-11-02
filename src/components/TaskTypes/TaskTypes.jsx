import TypeIcon from "components/TypeIcon/TypeIcon";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import "./TaskTypes.scss";

const TaskTypes = ({ types = [], task = {}, setCurrent }) => {
  const [type, setType] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (task.Type && types.length) {
      setType(types.find((type) => type.Creds.Name === task.Type));
    } else if (types.length) {
      setType(types[0]);
    }
  }, [task, types]);

  const onSetType = (type) => {
    setType(type);
    setCurrent({
      Type: type.Creds.Name,
      Action: type.Actions[0].Name,
      Name: type.Creds.Title,
      Description: type.Actions[0].Title,
    });
  };

  return (
    <>
      <div className="task-types-component">
        {types.map((type, index) => (
          <div
            key={index}
            onClick={() => onSetType(type)}
            className={`type-icon ${
              task.Type === type.Creds.Name ? "active" : ""
            }`}
          >
            <TypeIcon type={type.Creds.Name} />
          </div>
        ))}
      </div>
      <div className="mt-3 mb-3">
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
          <DropdownToggle
            caret={((type && type.Actions) || []).length > 1}
            className={`d-flex align-items-center justify-content-between m-0 p-0`}
            style={{ boxShadow: "none", background: "none" }}
          >
            <h3 className="m-0">
              {type
                ? (
                    type.Actions.find(
                      (action) => action.Name === task.Action
                    ) || {}
                  ).Title || ""
                : ""}
            </h3>
          </DropdownToggle>

          {((type && type.Actions) || []).length > 1 ? (
            <DropdownMenu
              style={{
                minWidth: "100%",
              }}
            >
              {((type && type.Actions) || []).map((action, index) => (
                <DropdownItem
                  key={index}
                  onClick={() =>
                    setCurrent({
                      Type: task.Type,
                      Action: action.Name,
                      Description: action.Title,
                    })
                  }
                >
                  {action.Title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          ) : null}
        </Dropdown>
      </div>
    </>
  );
};

export default TaskTypes;
