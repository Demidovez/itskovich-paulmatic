import { Button, Input, Modal } from "reactstrap";

import { useState } from "react";
import "./ModalCreateSequence.scss";
import SequencePageSteps from "components/SequencePageSteps/SequencePageSteps";
import SequencePageSettings from "components/SequencePageSettings/SequencePageSettings";
import SequencePagePeople from "components/SequencePagePeople/SequencePagePeople";
import SequencePageSchedule from "components/SequencePageSchedule/SequencePageSchedule";
import SequencePageLaunch from "components/SequencePageLaunch/SequencePageLaunch";
import Dropdown from "components/Dropdown/Dropdown";
import { usePrompt } from "hooks/usePrompt";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveNameSequence } from "store/slices/sequenceMasterSlice";
import PaginationCreateSequence from "components/PaginationCreateSequence/PaginationCreateSequence";

const ModalCreateSequence = ({ isShow, onClose }) => {
  const dispatch = useDispatch();
  const sequenceResultData = useSelector((state) => state.sequenceMaster.data);
  const sequenceName = useSelector((state) => state.sequenceMaster.data.Name);

  const [isChanged, setIsChanged] = useState(false);
  usePrompt(isChanged);

  const [currentIndexPage, setCurrentIndexPage] = useState(0);

  const [pages, setPages] = useState([
    {
      name: "steps",
      title: "Шаги",
      isDone: false,
      component: () => (
        <SequencePageSteps onChange={() => setIsChanged(true)} />
      ),
    },
    {
      name: "settings",
      title: "Настройки",
      isDone: false,
      component: () => (
        <SequencePageSettings onChange={() => setIsChanged(true)} />
      ),
    },
    {
      name: "people",
      title: "Люди",
      isDone: false,
      component: () => (
        <SequencePagePeople onChange={() => setIsChanged(true)} />
      ),
    },
    {
      name: "schedule",
      title: "Расписание",
      isDone: false,
      component: () => (
        <SequencePageSchedule onChange={() => setIsChanged(true)} />
      ),
    },
    {
      name: "launch",
      title: "Запуск",
      isDone: false,
      component: () => (
        <SequencePageLaunch onChange={() => setIsChanged(true)} />
      ),
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

  const editSequenceName = (name) => {
    setIsChanged(true);
    dispatch(saveNameSequence(name));
  };

  const handleClose = () => {
    if (isChanged) {
      var answer = window.confirm("Вы уверены, что хотите закрыть?");

      if (answer) {
        setIsChanged(false);
        onClose();
      } else {
        //some code
      }
    } else {
      onClose();
    }
  };

  const onSubmit = () => {
    console.log(sequenceResultData);
    setIsChanged(false);
    onClose();
  };

  return (
    <Modal
      className="modal-dialog-centered modal-create-sequence-component mt-0 mb-0 flex-column height-fill"
      contentClassName="h-100 flex-fill"
      isOpen={isShow}
      toggle={() => handleClose()}
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
            placeholder="Введите имя последовательности..."
            value={sequenceName}
            onChange={(e) => editSequenceName(e.target.value)}
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
          onClick={() => handleClose()}
          style={{ position: "absolute", right: "1.25rem" }}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      {pages[currentIndexPage].component()}
      <div className="modal-footer d-flex justify-content-between p-0">
        <div className="d-flex flex-fill h-100 m-0 ml-4">
          <PaginationCreateSequence
            pages={pages}
            currentIndex={currentIndexPage}
            setCurrentIndex={setCurrentIndexPage}
          />
        </div>
        <div className="sequence-btns ml-7 mt-2 mb-2 mr-4">
          <Button
            color="danger"
            outline
            data-dismiss="modal"
            type="button"
            onClick={() => handleClose()}
            size="sm"
          >
            Отмена
          </Button>
          {currentIndexPage < pages.length - 1 ? (
            <Button
              color="primary"
              type="button"
              onClick={() => nextPage()}
              size="sm"
            >
              Дальше
            </Button>
          ) : (
            <Button
              color="primary"
              type="button"
              onClick={() => onSubmit()}
              size="sm"
            >
              Создать
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateSequence;
