import { FiEdit3 } from "react-icons/fi";
import { RiToolsFill } from "react-icons/ri";

const TABS = [
  {
    id: 0,
    label: "Редактирование",
    name: "edit",
    icon: () => <FiEdit3 />,
  },
  {
    id: 1,
    label: "Работа",
    name: "work",
    icon: () => <RiToolsFill />,
  },
];

const MasterTabs = ({ setActive, active, close }) => {
  return (
    <div className="modal-header text-center pb-1 pt-2 d-flex align-items-center">
      <div className="sequence-tabs">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`${active === tab.id ? "active" : ""} sequence-tab`}
          >
            <div className="wrapper">
              <span>{tab.icon()}</span>
              {tab.label}
            </div>
          </div>
        ))}
      </div>
      <button
        aria-label="Close"
        className="close pr-2"
        data-dismiss="modal"
        type="button"
        onClick={close}
      >
        <span aria-hidden={true}>×</span>
      </button>
    </div>
  );
};

export default MasterTabs;
