import TypeIcon from "components/TypeIcon/TypeIcon";
import "./TaskTypes.scss";

const TaskTypes = ({ types, current, setCurrent }) => {
  return (
    <div className="task-types-component">
      {types.map((type) => (
        <div
          key={type.Creds.Name}
          onClick={() => setCurrent(type)}
          className={`type-icon ${
            current && current.Creds.Name === type.Creds.Name ? "active" : ""
          }`}
        >
          <TypeIcon type={type.Creds.Name} />
        </div>
      ))}
    </div>
  );
};

export default TaskTypes;
