import { Button, Input, Modal } from "reactstrap";
import { MdDone, MdCached, MdGppGood } from "react-icons/md";
import AvatarSymbols from "components/AvatarSymbols/AvatarSymbols";
import EditorEmail from "components/EditorEmail/EditorEmail";
import { useState } from "react";
import "./ModalCreateSequence.scss";
import SequencePageSteps from "components/SequencePageSteps/SequencePageSteps";
import SequencePageSettings from "components/SequencePageSettings/SequencePageSettings";
import SequencePagePeople from "components/SequencePagePeople/SequencePagePeople";
import SequencePageSchedule from "components/SequencePageSchedule/SequencePageSchedule";
import SequencePageLaunch from "components/SequencePageLaunch/SequencePageLaunch";
import Dropdown from "components/Dropdown/Dropdown";
import Checkbox from "components/Checkbox/Checkbox";

const ModalCreateSequence = ({ isShow, onClose }) => {
  const [sequenceName, setSequenceName] = useState(
    "Последовательность №" + (Math.floor(Math.random() * 100000) + 10000)
  );
  const [currentIndexPage, setCurrentIndexPage] = useState(0);

  const [pages, setPages] = useState([
    {
      name: "steps",
      title: "Шаги",
      isDone: false,
      component: () => <SequencePageSteps />,
    },
    {
      name: "settings",
      title: "Настройки",
      isDone: false,
      component: () => <SequencePageSettings />,
    },
    {
      name: "people",
      title: "Люди",
      isDone: false,
      component: () => <SequencePagePeople />,
    },
    {
      name: "schedule",
      title: "Расписание",
      isDone: false,
      component: () => <SequencePageSchedule />,
    },
    {
      name: "launch",
      title: "Запуск",
      isDone: false,
      component: () => <SequencePageLaunch />,
    },
  ]);

  const nextPage = () => {
    setCurrentIndexPage((prev) => prev + 1);
    setPages(
      pages.map((page, i) =>
        i <= currentIndexPage ? { ...page, isDone: true } : page
      )
    );
  };

  return (
    <Modal
      className="modal-dialog-centered modal-create-sequence-component mt-0 mb-0 flex-column height-fill"
      contentClassName="h-100 flex-fill"
      isOpen={isShow}
      toggle={() => onClose()}
      style={{
        maxWidth: "1200px",
        width: "90%",
        minWidth: "200px",
        minHeight: "100%",
        padding: "2.5rem 0",
      }}
    >
      <div className="modal-header text-center pb-0 ">
        <div className="w-100 d-flex align-items-center">
          <h4 className="modal-title d-flex pr-3">
            Создать последовательность
          </h4>
          <Input
            type="text"
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
            className="sequence-name-input"
          />
          <Dropdown
            items={["Металлургия", "Другое"]}
            className="ml-3"
            outline={true}
            defaultValue="Папка"
          />
        </div>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => onClose()}
          style={{ position: "absolute", right: "1.25rem" }}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      {pages[currentIndexPage].component()}
      <div className="modal-footer d-flex justify-content-between">
        <div className="d-flex">
          {pages.map((page, index) => (
            <div
              key={page.name}
              className={`d-flex align-items-center page-sequence-item ${
                index === currentIndexPage ? "current" : ""
              } ${page.isDone ? "done" : ""}`}
              onClick={() => setCurrentIndexPage(index)}
            >
              <div className={`page-sequence-icon`}>
                <MdDone />
              </div>
              <span>{page.title}</span>
            </div>
          ))}
        </div>
        <div className="sequence-btns">
          <Button
            color="danger"
            outline
            data-dismiss="modal"
            type="button"
            onClick={() => onClose()}
          >
            Отмена
          </Button>
          {currentIndexPage < pages.length - 1 ? (
            <Button color="primary" type="button" onClick={() => nextPage()}>
              Дальше
            </Button>
          ) : (
            <Button color="primary" type="button" onClick={() => onClose()}>
              Создать
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateSequence;
