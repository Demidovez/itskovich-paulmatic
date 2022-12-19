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
import useMasterPages from "hooks/useMasterPages";

const DATA_DEFAULT = {
  Spec: {
    Model: { Steps: [] },
    TimeZoneId: 56,
    Name: "",
  },
};

const MasterTabEditSequence = ({
  onClose,
  isShow,
  onSubmit,
  data = DATA_DEFAULT,
}) => {
  const {
    Spec: { Model, TimeZoneId, Name, FolderID },
  } = data;
  const dispatch = useDispatch();

  const timeZones = useSelector((state) => state.common.TimeZones);

  const { data: foldersList = [] } = useGetFoldersQuery();

  const { pages, nextPage, isDone, currentPage, setCurrentPage } =
    useMasterPages();

  const editSequenceName = (name) => {
    dispatch(saveNameSequence(name));
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
            value={Name}
            onChange={(e) => editSequenceName(e.target.value)}
            className="sequence-name-input"
          />
          <div className="d-flex align-items-center ml-3">
            <div className="nowrap">Папка:</div>
            <Dropdown
              items={[{ id: 0, Name: "Все" }, ...foldersList]}
              fieldOfItem="Name"
              className="ml-3 folder-selecter"
              // isFull={true}
              outline={true}
              defaultValue={
                FolderID === 0
                  ? "Все"
                  : foldersList.find((folder) => folder.id === FolderID)?.Name
              }
              isDisabled={foldersList.length === 0}
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
                (timeZones.find((zone) => zone.Id === TimeZoneId) || {}).Name
              }
              onSelect={(timezone) =>
                dispatch(saveTimeZoneSequence(timezone.Id))
              }
            />
          </div>
        </div>
      </div>
      <SequencePageSteps isShow={currentPage === 0} steps={Model.Steps} />
      <SequencePagePeople
        isShow={currentPage === 1}
        contactIds={Model.ContactIds}
      />
      <SequencePageSchedule
        isShow={currentPage === 2}
        schedule={Model.Schedule}
      />
      <SequencePageLaunch isShow={currentPage === 3} />
      <div className="modal-footer d-flex justify-content-between p-0">
        <div className="d-flex flex-fill h-100 m-0 ml-4 overflow-hidden">
          <PaginationCreateSequence
            pages={pages}
            currentIndex={currentPage}
            setCurrentIndex={setCurrentPage}
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
          {currentPage < pages.length - 1 ? (
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
              {Model.ContactIds.length > 0 ? "Сохранить & Запуск" : "Сохранить"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterTabEditSequence;
