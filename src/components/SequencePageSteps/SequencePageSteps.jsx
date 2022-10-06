import { useEffect, useState } from "react";
import { MdExpandMore, MdMail } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

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
      step: 1,
      day: 4,
      level: "A",
      name: "",
      description:
        "Привет {{FirstName}}, причина почему {{Company}} в моем поле зрения это что {{Sender.Company}}",
      isNoReply: true,
      isVariants: true,
    },
  ]);

  return (
    <div className="sequence-page-steps-component pl-3 pr-3">
      {steps.map((step) => (
        <div key={step.id} className="d-flex">
          <div className="d-flex flex-column">
            <div>
              {step.type === "linkedin" ? <BsLinkedin color="#037794" /> : null}
              {step.type === "carbage" ? <RiDeleteBin5Line /> : null}
              {step.type === "mail" ? <MdMail color="brown" /> : null}
            </div>
            <div className="flex-fill" />
          </div>
          <div>
            <span>
              Шаг {step.step + 1} - День {step.day + 1} <MdExpandMore />
            </span>
            <div
              style={{
                border: "1px solid #d6d6d6",
                borderRadius: "6px",
                padding: "10px 15px",
              }}
              className="row ml-0 mr-0"
            >
              <div className="col col-4 d-flex">
                <div style={{ width: 50 }}>{step.level}</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{step.name}</div>
              </div>
              <div className="col col-7" style={{ opacity: 0.7, fontSize: 14 }}>
                {step.description}
              </div>
              <div className="col col-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SequencePageSteps;
