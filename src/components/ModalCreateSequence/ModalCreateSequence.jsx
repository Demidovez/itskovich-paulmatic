import { Button, Input, Modal } from "reactstrap";
import { useEffect, useState } from "react";
import "./ModalCreateSequence.scss";
import SequencePageSteps from "components/SequencePageSteps/SequencePageSteps";
import SequencePageSettings from "components/SequencePageSettings/SequencePageSettings";
import SequencePagePeople from "components/SequencePagePeople/SequencePagePeople";
import SequencePageSchedule from "components/SequencePageSchedule/SequencePageSchedule";
import SequencePageLaunch from "components/SequencePageLaunch/SequencePageLaunch";
import Dropdown from "components/Dropdown/Dropdown";
import { usePrompt } from "hooks/usePrompt";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import PaginationCreateSequence from "components/PaginationCreateSequence/PaginationCreateSequence";
import { useGetFoldersQuery } from "store/api/folders";
import {
  saveFolderIdSequence,
  saveNameSequence,
  saveTimeZoneSequence,
} from "store/slices/sequenceMasterSlice";
import {
  setCurrentContactPage,
  clearSelectedIds,
  searchValueContactPage,
} from "store/slices/contactsSlice";
import { useCreateOrUpdateSequenceMutation } from "store/api/sequences";
import useYouSure from "hooks/useYouSure";
import { addHtmlTemplates } from "store/slices/commonSlice";
import { useLazySendLogQuery } from "store/api/sequences";
import Scrollbar from "components/Scrollbar/Scrollbar";

const ModalCreateSequence = ({ onClose }) => {
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const dispatch = useDispatch();

  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sequenceResultData = useSelector((state) => state.sequenceMaster.data);
  const sequenceName = useSelector((state) => state.sequenceMaster.data.Name);
  const timeZones = useSelector((state) => state.common.timeZones);

  const [sendLog, { data: responseLogData, isError }] = useLazySendLogQuery();

  useEffect(() => {
    if (
      sequenceResultData.Model.Steps.length &&
      sequenceResultData.Model.Schedule.length
    ) {
      console.log(sequenceResultData);
      sendLog(sequenceResultData);
    }
  }, [JSON.stringify(sequenceResultData)]);

  const activeFolderId = useSelector(
    (state) => state.sequences.selectedFolderId
  );

  const [createOrUpdateSequence, { data: resultOfCreateOrUpdateSequence }] =
    useCreateOrUpdateSequenceMutation();

  useEffect(() => {
    if (
      resultOfCreateOrUpdateSequence &&
      resultOfCreateOrUpdateSequence.templates
    ) {
      dispatch(addHtmlTemplates(resultOfCreateOrUpdateSequence.templates));
    }
  }, [resultOfCreateOrUpdateSequence]);

  useEffect(() => {
    resetContactsData();

    return () => {
      resetContactsData();
    };
  }, []);

  useEffect(() => {
    dispatch(saveFolderIdSequence(activeFolderId));
  }, [activeFolderId]);

  const { data: foldersList } = useGetFoldersQuery();

  const [currentIndexPage, setCurrentIndexPage] = useState(0);

  // TODO: Заменить на pagesData
  const [pages, setPages] = useState([
    {
      name: "steps",
      title: "Шаги",
      isDone: false,
    },
    // {
    //   name: "settings",
    //   title: "Настройки",
    //   isDone: false,
    // },
    {
      name: "people",
      title: "Люди",
      isDone: false,
    },
    {
      name: "schedule",
      title: "Расписание",
      isDone: false,
    },
    {
      name: "launch",
      title: "Запуск",
      isDone: false,
    },
  ]);

  const pagesData = useSelector((state) => state.sequenceMaster.pages);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const isDone = !Object.values(pagesData).some(
      (page) => page.isDone === false
    );

    setIsDone(isDone);
  }, [JSON.stringify(pagesData)]);

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

  const resetContactsData = () => {
    dispatch(clearSelectedIds());
    dispatch(setCurrentContactPage(0));
    dispatch(searchValueContactPage(""));
  };

  const onSubmit = () => {
    createOrUpdateSequence(sequenceResultData);
    console.log(sequenceResultData);
    setIsChanged(false);
    onClose();
  };

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (isError || responseLogData) {
      setHasData(true);
    }
  }, [isError, responseLogData]);

  return (
    <>
      <Modal
        className="modal-dialog-centered modal-create-sequence-component mt-0 mb-0 flex-column height-fill"
        contentClassName="h-100 flex-fill flex-row "
        isOpen={true}
        toggle={tryClose}
        style={{
          maxWidth: hasData ? "100%" : "1200px",
          width: "100%",
          minWidth: "200px",
          minHeight: "100%",
          padding: "2.5rem 4rem",
          overflow: "hidden",
        }}
      >
        <div
          className="h-100 d-flex flex-column modal-inner position-relative overflow-auto"
          style={{ flex: 5 }}
        >
          <div className="modal-header text-center pb-1 d-flex align-items-center">
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
                items={[{ id: 0, Name: "Все" }, ...(foldersList || [])]}
                fieldOfItem="Name"
                className="ml-3"
                outline={true}
                defaultValue={
                  activeFolderId === 0
                    ? "Все"
                    : (foldersList || []).find(
                        (folder) => folder.id === activeFolderId
                      ).Name
                }
                isDisabled={(foldersList || []).length === 0}
                onSelect={(folder) => dispatch(saveFolderIdSequence(folder.id))}
              />
              <div className="d-flex align-items-center ml-3">
                <div>Временная зона:</div>
                <Dropdown
                  items={timeZones}
                  // fieldOfItem="Name"
                  maxLength={hasData ? 15 : 1000}
                  className="ml-3"
                  outline={true}
                  defaultValue={sequenceResultData.TimeZone}
                  onSelect={(timezone) =>
                    dispatch(saveTimeZoneSequence(timezone))
                  }
                />
              </div>
            </div>
            <button
              aria-label="Close"
              className="close pr-2"
              data-dismiss="modal"
              type="button"
              onClick={tryClose}
              // style={{ position: "absolute", right: "1.25rem" }}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <SequencePageSteps
            isShow={currentIndexPage === 0}
            onChange={() => setIsChanged(true)}
          />
          {/* <SequencePageSettings
        isShow={currentIndexPage === 1}
        onChange={() => setIsChanged(true)}
      /> */}
          <SequencePagePeople
            isShow={currentIndexPage === 1}
            onChange={() => setIsChanged(true)}
          />
          <SequencePageSchedule
            isShow={currentIndexPage === 2}
            onChange={() => setIsChanged(true)}
          />
          <SequencePageLaunch
            isShow={currentIndexPage === 3}
            onChange={() => setIsChanged(true)}
          />
          <div className="modal-footer d-flex justify-content-between p-0">
            <div className="d-flex flex-fill h-100 m-0 ml-4 overflow-hidden">
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
                onClick={tryForceClose}
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
                  disabled={!isDone}
                >
                  Создать
                </Button>
              )}
            </div>
          </div>
        </div>
        {hasData && (
          <Scrollbar
            className="seaquences-create-info"
            style={{ flex: 2, whiteSpace: "break-spaces" }}
          >
            <>
              {/* {parse("<div>1111</div>")} */}
              {JSON.stringify(sequenceResultData, null, 2).replaceAll(
                ",",
                ", "
              )}
            </>
          </Scrollbar>
        )}
      </Modal>
    </>
  );
};

export default ModalCreateSequence;
