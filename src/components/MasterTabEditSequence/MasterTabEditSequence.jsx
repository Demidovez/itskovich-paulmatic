import { Button, Input, Modal } from "reactstrap";
import { useEffect, useState } from "react";
import "./MasterTabEditSequence.scss";
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
import DateTimePicker from "components/DateTimePicker/DateTimePicker";
import { setLogStartNameSequence } from "store/slices/sequenceMasterSlice";

const MasterTabEditSequence = ({ onClose, isShow }) => {
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const dispatch = useDispatch();

  const [resultError, setResultError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sequenceResultData = useSelector((state) => state.sequenceMaster.data);
  const sequenceName = useSelector((state) => state.sequenceMaster.data.Name);
  const timeZones = useSelector((state) => state.common.TimeZones);

  const [sendLog, { data: responseLogData, isError, error }] =
    useLazySendLogQuery();

  useEffect(() => {
    if (
      sequenceResultData.Model.Steps.length &&
      sequenceResultData.Model.Schedule.length
    ) {
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
    setIsChanged(false);
    onClose();
  };

  const [logHtml, setLogHtml] = useState("");

  useEffect(() => {
    if (isError && error) {
      setLogHtml((error || {}).message);
    } else if (responseLogData) {
      setLogHtml(responseLogData);
    }
  }, [isError, error, responseLogData]);

  const onLogDateTime = (datetime) => {
    dispatch(setLogStartNameSequence(datetime));
  };

  return (
    <div
      className="master-tab-edit-sequence-component pt-3 h-100 flex-column position-relative overflow-auto"
      style={{ display: isShow ? "flex" : "none" }}
    >
      <div className="text-center pb-1 d-flex align-items-center">
        <div className="w-100 d-flex align-items-center">
          <h4 className="modal-title d-flex pr-3 pl-3">Последовательность</h4>
          <Input
            type="text"
            placeholder="Имя последовательности..."
            value={sequenceName}
            onChange={(e) => editSequenceName(e.target.value)}
            className="sequence-name-input"
          />
          <div className="d-flex align-items-center ml-3">
            <div className="nowrap">Папка:</div>
            <Dropdown
              items={[{ id: 0, Name: "Все" }, ...(foldersList || [])]}
              fieldOfItem="Name"
              className="ml-3 folder-selecter"
              // isFull={true}
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
              style={{
                width: 120,
              }}
            />
          </div>

          <div className="d-flex align-items-center ml-3">
            <div className="nowrap">Временная зона:</div>
            <Dropdown
              items={timeZones}
              fieldOfItem="Name"
              maxLength={1000}
              // isFull={true}
              className="ml-3"
              outline={true}
              defaultValue={
                (
                  timeZones.find(
                    (zone) => zone.Id === sequenceResultData.TimeZoneId
                  ) || {}
                ).Name
              }
              onSelect={(timezone) =>
                dispatch(saveTimeZoneSequence(timezone.Id))
              }
            />
          </div>
        </div>
      </div>
      <SequencePageSteps
        isShow={currentIndexPage === 0}
        onChange={() => setIsChanged(true)}
      />
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
              {sequenceResultData.Model.ContactIds.length > 0
                ? "Сохранить & Запуск"
                : "Сохранить"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterTabEditSequence;
