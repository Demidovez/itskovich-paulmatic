import {
  Button,
  Input,
  Modal,
  PopoverBody,
  UncontrolledPopover,
} from "reactstrap";
import React from "react";
import { useEffect, useRef, useState } from "react";
import "./MasterTabWorkSequence.scss";
import TableContacts from "components/TableContacts/TableContacts";
import { useSelector } from "react-redux";
import Checkbox from "components/Checkbox/Checkbox";
import SearchBar from "components/SearchBar/SearchBar";
import { IoAddOutline } from "react-icons/io5";
import { useLazyGetStatsQuery } from "store/api/sequences";
import TableSequenceContacts from "components/TableSequenceContacts/TableSequenceContacts";
import PaginationCustom from "components/Pagination/Pagination";
import { useLazyGetPersonsQuery } from "store/api/persons";
import ModalContactForm from "components/ModalContactForm/ModalContactForm";
import { toast } from "react-toastify";
import { useLazyAddContactToSequenceQuery } from "store/api/sequences";
import { useUploadFileMutation } from "store/api/sequences";
import { useLazyGetSchemaFileQuery } from "store/api/contacts";
import ModalCSVColumns from "components/ModalCSVColumns/ModalCSVColumns";
import { csvFileToArray } from "utils/utils";
import ModalYouSure from "components/ModalYouSure/ModalYouSure";
import { useLazyRemoveContactsQuery } from "store/api/sequences";

const STEPS = [
  {
    id: -1,
    label: "Все",
  },
  {
    id: 0,
    label: "Шаг 1",
  },
  {
    id: 1,
    label: "Шаг 2",
  },
  {
    id: 2,
    label: "Шаг 3",
  },
  {
    id: 3,
    label: "Шаг 4",
  },
];

const MasterTabWorkSequence = ({
  isShow = false,
  sequenceId,
  sequenceName = "",
}) => {
  const [activeStepId, setActiveStepId] = useState(-1);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isShowCreateContacts, setIsShowCreateContacts] = useState(false);
  const [isShowCSV, setIsShowCSV] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isAskSure, setIsAskSure] = useState(false);

  const [getStats, { data: statsResponse }] = useLazyGetStatsQuery();

  const [addContact, { isSuccess: isSuccessAddContact }] =
    useLazyAddContactToSequenceQuery();

  const [uploadFile, { isSuccess: isSuccessUploadFile, isError, error }] =
    useUploadFileMutation();

  const [
    removeContacts,
    { isSuccess: isSuccessDeleting, isError: isErrorDeleting },
  ] = useLazyRemoveContactsQuery();

  useEffect(() => {
    if (sequenceId !== null) {
      getStats({
        id: sequenceId,
        offset: currentPage * 100,
        count: 100,
        stepIndex: activeStepId >= 0 ? activeStepId : null,
        q: search,
      });
    }
  }, [
    sequenceId,
    activeStepId,
    search,
    currentPage,
    isSuccessAddContact,
    isSuccessUploadFile,
    isSuccessDeleting,
    // isErrorDeleting,
  ]);

  const popoverRef = useRef(null);

  const onCreateContact = () => {
    setIsShowCreateContacts(false);
    setIsCreateNew(true);
  };

  const onSave = (contact) => {
    addContact({ id: sequenceId, contact });
    setIsCreateNew(false);
  };

  const inputFile = useRef(null);

  const [getSchemaFile, { data: schemaResponse, isSuccess, isFetching }] =
    useLazyGetSchemaFileQuery();

  useEffect(() => {
    if (isError && error) {
      toast.error("Ошибка загрузки");
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      setIsShowCSV(true);
    }
  }, [isSuccess, isFetching]);

  const onInputFile = (e) => {
    try {
      const formData = new FormData();
      formData.append("f", e.target.files[0]);

      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const rows = csvFileToArray(target.result);
        getSchemaFile([
          Object.keys(rows[0]).join(";").replaceAll("\r", ""),
          Object.values(rows[0]).join(";").replaceAll("\r", ""),
        ]);
      };
      reader.readAsText(e.target.files[0]);

      setFormData(formData);

      inputFile.current.value = null;
    } catch (err) {
      toast.error("Ошибка загрузки файла");
      console.error(err);
    }
  };

  const onUploadFile = () => {
    setIsShowCreateContacts(false);
    inputFile.current.click();
    console.log("onUploadFile");
  };

  const onSaveCSVFile = (columns) => {
    console.log(columns);
    formData.append(
      "schema",
      JSON.stringify({
        Items: columns.map((column) => ({
          FileField: column.field,
          Expample: column.desc,
          ContactFieldId: column.idColumn,
        })),
      })
    );

    setIsShowCSV(false);
    uploadFile({
      file: formData,
      id: sequenceId,
    });
    setFormData(null);
  };

  const onSelectContact = (id) => {
    const hasId = selectedIds.includes(id);

    setIsSelectedAll(false);

    if (hasId) {
      setSelectedIds((ids) => ids.filter((currId) => currId !== id));
    } else {
      setSelectedIds((ids) => [...ids, id]);
    }
  };

  useEffect(() => {
    if (isSelectedAll && statsResponse) {
      setSelectedIds(statsResponse.Items.map(({ Contact }) => Contact.id));
    }
  }, [isSelectedAll, statsResponse]);

  const onChangeAllSelected = () => {
    if (isSelectedAll) {
      setIsSelectedAll(false);
      setSelectedIds([]);
    } else {
      setIsSelectedAll(true);
    }
  };

  const onDeleteContacts = () => {
    removeContacts({
      id: sequenceId,
      contactIds: selectedIds.join(","),
      count: selectedIds.length,
      name: sequenceName,
    });
    setIsAskSure(false);
    setSelectedIds([]);
    setIsSelectedAll(false);
  };

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept=".csv"
        style={{ display: "none" }}
        onChange={onInputFile}
      />

      <div
        className="master-tab-work-sequence-component pt-3 h-100 flex-column position-relative overflow-hidden"
        style={{ display: isShow ? "flex" : "none" }}
      >
        <div className="content overflow-hidden h-100">
          <div className="steps">
            <h3>Шаги</h3>
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`${activeStepId === step.id ? "active" : ""} step`}
                onClick={() => setActiveStepId(step.id)}
              >
                {step.label}
              </div>
            ))}
          </div>
          <div className="people w-100 overflow-hidden flex-fill">
            <div className="people-header pt-1" style={{ flex: 1 }}>
              <div>
                <Checkbox
                  id="allseqcontacts"
                  label="Все"
                  className="pl-4 ml-2"
                  scale={1.2}
                  checked={isSelectedAll}
                  onChange={onChangeAllSelected}
                />
              </div>
              <div style={{ position: "relative" }}>
                {selectedIds.length ? (
                  <Button
                    color="danger"
                    className="mr-0"
                    outline
                    type="button"
                    onClick={() => setIsAskSure(true)}
                  >
                    Удалить
                  </Button>
                ) : null}
                <Input
                  placeholder="Поиск..."
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="add-contact">
                  <div
                    onClick={() =>
                      setIsShowCreateContacts(!isShowCreateContacts)
                    }
                  >
                    <IoAddOutline size={"1.6rem"} />
                  </div>
                </div>

                {isShowCreateContacts ? (
                  <div className="select">
                    <div className="select-items">
                      <div
                        onClick={onUploadFile}
                        onMouseEnter={() => {
                          popoverRef.current.click();
                        }}
                        onMouseLeave={() => {
                          popoverRef.current.click();
                        }}
                      >
                        Из CSV-файла
                      </div>
                      <div
                        id="create_csv"
                        ref={popoverRef}
                        style={{
                          position: "absolute",
                          top: "17px",
                          zIndex: -1,
                        }}
                      />
                      <UncontrolledPopover
                        placement="left"
                        target="create_csv"
                        className="create_csv"
                      >
                        <div className="p-3" style={{ width: 700 }}>
                          <p>Пример загружаемого файла:</p>
                          <img
                            src={require("../../assets/img/contacts_from_csv.jpg")}
                            alt=""
                            style={{ width: "100%" }}
                          />
                        </div>
                      </UncontrolledPopover>
                      <div onClick={onCreateContact}>Вручную</div>
                    </div>
                    <span className="arrow"></span>
                  </div>
                ) : null}
              </div>
            </div>
            <TableSequenceContacts
              data={statsResponse}
              selectedIds={selectedIds}
              onSelect={onSelectContact}
              fillHeader={false}
              isSelectedAll={isSelectedAll}
            />
          </div>
        </div>

        {(statsResponse || {}).TotalCount ? (
          <div className="modal-footer d-flex justify-content-between p-0">
            <div className="d-flex  justify-content-between flex-fill h1-100 m-0 ml-4 overflow-hidden p-3 ">
              <div></div>
              <PaginationCustom
                allCount={statsResponse ? statsResponse.TotalCount : 0}
                countOnPage={100}
                page={currentPage}
                moveToPage={setCurrentPage}
              />
            </div>
          </div>
        ) : null}
      </div>

      <ModalContactForm
        isShow={isCreateNew}
        onSave={onSave}
        onClose={() => setIsCreateNew(false)}
      />

      <ModalCSVColumns
        isShow={isShowCSV}
        onClose={() => setIsShowCSV(false)}
        onSave={onSaveCSVFile}
        columns={(schemaResponse || { Items: [] }).Items}
      />

      <ModalYouSure
        isShow={isAskSure}
        title={"Удалить выбранные контакты?"}
        text={"Вы действительно хотите удалить выбранные контакты?"}
        onAgree={onDeleteContacts}
        onCancel={() => setIsAskSure(false)}
      />
    </>
  );
};

export default React.memo(MasterTabWorkSequence);
