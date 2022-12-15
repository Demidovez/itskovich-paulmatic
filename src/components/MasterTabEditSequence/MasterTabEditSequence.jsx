import { Button, Input } from "reactstrap";
import { useEffect, useState } from "react";
import "./MasterTabEditSequence.scss";
import SequencePageSteps from "components/SequencePageSteps/SequencePageSteps";
import SequencePagePeople from "components/SequencePagePeople/SequencePagePeople";
import SequencePageSchedule from "components/SequencePageSchedule/SequencePageSchedule";
import SequencePageLaunch from "components/SequencePageLaunch/SequencePageLaunch";
import Dropdown from "components/Dropdown/Dropdown";
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
import { addHtmlTemplates } from "store/slices/commonSlice";
import { toast } from "react-toastify";

const MasterTabEditSequence = ({ onClose, isShow, model }) => {
  const dispatch = useDispatch();

  const sequenceName = useSelector((state) => state.sequenceMaster.data.Name);
  const timeZones = useSelector((state) => state.common.TimeZones);

  const activeFolderId = useSelector(
    (state) => state.sequences.selectedFolderId
  );

  const [
    createOrUpdateSequence,
    { data: resultOfCreateOrUpdateSequence, isError, error, isSuccess },
  ] = useCreateOrUpdateSequenceMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      try {
        toast.error(error.data.error.message);
      } catch (err) {
        console.error(err);
        toast.error("Ошибка сохранения");
      }
    }
  }, [isError, error]);

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
    dispatch(saveNameSequence(name));
  };

  const resetContactsData = () => {
    dispatch(clearSelectedIds());
    dispatch(setCurrentContactPage(0));
    dispatch(searchValueContactPage(""));
  };

  const onSubmit = () => {
    createOrUpdateSequence(model);
    console.log(model);
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
                (timeZones.find((zone) => zone.Id === model.TimeZoneId) || {})
                  .Name
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
        onChange={() => {}}
        initSteps={model.Model.Steps}
      />
      <SequencePagePeople isShow={currentIndexPage === 1} onChange={() => {}} />
      <SequencePageSchedule
        isShow={currentIndexPage === 2}
        onChange={() => {}}
        init={model.Model.Schedule}
      />
      <SequencePageLaunch isShow={currentIndexPage === 3} onChange={() => {}} />
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
            onClick={onClose}
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
              {model.Model.ContactIds.length > 0
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
