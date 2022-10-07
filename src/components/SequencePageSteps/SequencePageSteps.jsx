import { useEffect, useState } from "react";
import { MdExpandMore, MdMail, MdOutlineNoteAdd, MdAdd } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit3, FiPlusSquare } from "react-icons/fi";
import "./SequencePageSteps.scss";

const SequencePageSteps = () => {
  const [steps, setSteps] = useState([
    {
      id: 0,
      type: "linkedin",
      step: 0,
      day: 0,
      level: "",
      name: "Просмотр профиля",
      description: "Простой просмотр LinkedIn профиля",
      isNoReply: false,
      isVariants: false,
    },
    {
      id: 1,
      type: "carbage",
      step: 1,
      day: 0,
      level: "A",
      name: "{{Sender.Company}}<>{{Company}}",
      description:
        "Привет {{FirstName}}, я обратился к тебе потому что заметил та твоем профиле кое-что",
      isNoReply: false,
      isVariants: true,
    },
    {
      id: 2,
      type: "mail",
      step: 2,
      day: 4,
      level: "A",
      name: "",
      description:
        "Привет {{FirstName}}, причина почему {{Company}} в моем поле зрения это что {{Sender.Company}}",
      isNoReply: true,
      isVariants: true,
    },
  ]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: 0,
        type: "linkedin",
        step: 0,
        day: 0,
        level: "",
        name: "Просмотр профиля",
        description: "Простой просмотр LinkedIn профиля",
        isNoReply: false,
        isVariants: false,
      },
    ]);
  };

  return (
    <div className="sequence-page-steps-component modal-body d-flex flex-column overflow-hidden p-0">
      <div className="add-step">
        <div onClick={addStep}>
          <MdAdd size="1.6rem" />
        </div>
      </div>
      <div className="p-4 overflow-auto">
        {steps.map((step) => (
          <div key={step.id} className="d-flex sequence-step">
            <div className="d-flex flex-column pl-0 pr-3 align-items-center">
              <div className="mb-2">
                {step.type === "linkedin" ? (
                  <BsLinkedin color="#037794" size="1.5rem" />
                ) : null}
                {step.type === "carbage" ? (
                  <RiDeleteBin5Line size="1.5rem" />
                ) : null}
                {step.type === "mail" ? (
                  <MdMail color="brown" size="1.5rem" />
                ) : null}
              </div>
              <div className="flex-fill vertical-line" />
            </div>
            <div className="w-100 pb-4">
              <span className="step-label">
                Шаг {step.step + 1} - День {step.day + 1}{" "}
                <MdExpandMore size="1.5rem" className="mt--1" />
              </span>
              <div className="row sequence-desc  ml-0 mr-0 mt-2 mb-2">
                <div className="col col-4 d-flex">
                  <div style={{ width: 50 }}>{step.level}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {step.name}
                  </div>
                </div>
                <div
                  className="col col-7 description"
                  style={{ opacity: 0.7, fontSize: 14 }}
                >
                  {step.description}
                </div>
                <div className="col col-1 sequence-desc-controls d-flex">
                  <FiEdit3 size="1.2rem" />
                  <FiPlusSquare size="1.2rem" />
                </div>
              </div>
              {step.isVariants && (
                <div className="add-variant d-flex align-items-center pl-3">
                  <MdOutlineNoteAdd />
                  <span>Добавить вариант</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequencePageSteps;
