import { Button, Input, Modal } from "reactstrap";
import { useEffect, useState } from "react";
import "./ModalMasterTabsSequence.scss";
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
import { FiEdit3 } from "react-icons/fi";
import { RiToolsFill } from "react-icons/ri";
import MasterTabEditSequence from "components/MasterTabEditSequence/MasterTabEditSequence";
import MasterTabWorkSequence from "components/MasterTabWorkSequence/MasterTabWorkSequence";
import { initMaster } from "store/slices/sequenceMasterSlice";

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

const ModalMasterTabsSequence = ({ onClose, sequenceId = null }) => {
  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const dispatch = useDispatch();

  const [activeTabId, setActiveTabId] = useState(0);

  const cachedSequences = useSelector((state) => state.sequences.cached);
  const sequenceResultData = useSelector((state) => state.sequenceMaster.data);

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

  useEffect(() => {
    if (sequenceId !== null && cachedSequences) {
      const currentSequence = cachedSequences.Items.find(
        (item) => item.id === sequenceId
      );
      dispatch(initMaster(currentSequence));
    }
  }, [sequenceId, cachedSequences]);

  return (
    <>
      <Modal
        className="modal-dialog-centered modal-master-tabs-sequence-component mt-0 mb-0 flex-column height-fill"
        contentClassName="h-100 flex-fill flex-row "
        isOpen={true}
        toggle={tryClose}
        style={{
          maxWidth: "100%",
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
          {sequenceId !== null && (
            <div className="modal-header text-center pb-1 pt-2 d-flex align-items-center">
              <div className="sequence-tabs">
                {TABS.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`${
                      activeTabId === tab.id ? "active" : ""
                    } sequence-tab`}
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
                onClick={tryClose}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
          )}
          <MasterTabEditSequence isShow={activeTabId === 0} />
          <MasterTabWorkSequence
            isShow={activeTabId === 1}
            sequenceId={sequenceId}
          />
        </div>

        <div
          className="seaquences-create-info"
          style={{ flex: 2, whiteSpace: "break-spaces", padding: "20px 20px" }}
        >
          <>
            <DateTimePicker
              datetime={sequenceResultData.LogStartName}
              onDateTime={onLogDateTime}
            />
            {parse(logHtml)}
          </>
        </div>
      </Modal>
    </>
  );
};

export default ModalMasterTabsSequence;
