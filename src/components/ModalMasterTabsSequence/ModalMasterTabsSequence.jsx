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
  setCurrentContactPage,
  clearSelectedIds,
  searchValueContactPage,
} from "store/slices/contactsSlice";
import { useCreateOrUpdateSequenceMutation } from "store/api/sequences";
import useYouSure from "hooks/useYouSure";
import { addHtmlTemplates } from "store/slices/commonSlice";
import { useLazySendLogQuery } from "store/api/sequences";
import DateTimePicker from "components/DateTimePicker/DateTimePicker";

import MasterTabEditSequence from "components/MasterTabEditSequence/MasterTabEditSequence";
import MasterTabWorkSequence from "components/MasterTabWorkSequence/MasterTabWorkSequence";
import {
  initMaster,
  doneMaster,
  setLogStartNameSequence,
  saveFolderIdSequence,
  saveNameSequence,
  saveTimeZoneSequence,
} from "store/slices/sequenceMasterSlice";
import MasterTabs from "components/MasterTabs/MasterTabs";
import { toast } from "react-toastify";
import useCreateOrUpdateSequence from "hooks/useCreateOrUpdateSequence";

const ModalMasterTabsSequence = ({ onClose, sequenceId = null }) => {
  const dispatch = useDispatch();

  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const [activeTabId, setActiveTabId] = useState(0);

  const cachedSequences = useSelector((state) => state.sequences.cached);
  const sequenceMasterData = useSelector((state) => state.sequenceMaster.data);
  const isEditing = useSelector((state) => state.sequenceMaster.isEditing);

  const { createOrUpdate } = useCreateOrUpdateSequence(tryForceClose);

  useEffect(() => {
    return () => dispatch(doneMaster());
  }, []);

  useEffect(() => {
    setIsChanged(isEditing);
  }, [isEditing]);

  useEffect(() => {
    if (sequenceId !== null && cachedSequences) {
      const currentSequence = cachedSequences.Items.find(
        (item) => item.id === sequenceId
      );
      dispatch(initMaster(currentSequence));
    }
  }, [sequenceId, cachedSequences]);

  const onSubmit = () => {
    createOrUpdate(sequenceMasterData.Spec.Model);
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered modal-master-tabs-sequence-component mt-0 mb-0 flex-column height-fill"
        contentClassName="h-100 flex-fill flex-row "
        isOpen={true}
        toggle={tryClose}
      >
        <div
          className="h-100 d-flex flex-column modal-inner position-relative overflow-auto"
          style={{ flex: 5 }}
        >
          {sequenceId !== null && (
            <MasterTabs
              setActive={setActiveTabId}
              active={activeTabId}
              close={tryClose}
            />
          )}
          <MasterTabEditSequence
            isShow={activeTabId === 0}
            onClose={tryClose}
            data={sequenceMasterData}
            onSubmit={onSubmit}
          />
          <MasterTabWorkSequence
            isShow={activeTabId === 1}
            sequenceId={sequenceId}
            sequenceName={sequenceMasterData?.Name}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalMasterTabsSequence;
