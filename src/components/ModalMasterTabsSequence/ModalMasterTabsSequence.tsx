import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input, Modal } from 'reactstrap';

import DateTimePicker from '~src/components/DateTimePicker/DateTimePicker';
import Dropdown from '~src/components/Dropdown/Dropdown';
import MasterTabEditSequence from '~src/components/MasterTabEditSequence/MasterTabEditSequence';
import MasterTabs from '~src/components/MasterTabs/MasterTabs';
import MasterTabWorkSequence from '~src/components/MasterTabWorkSequence/MasterTabWorkSequence';
import PaginationCreateSequence from '~src/components/PaginationCreateSequence/PaginationCreateSequence';
import SequencePageLaunch from '~src/components/SequencePageLaunch/SequencePageLaunch';
import SequencePagePeople from '~src/components/SequencePagePeople/SequencePagePeople';
import SequencePageSchedule from '~src/components/SequencePageSchedule/SequencePageSchedule';
import SequencePageSettings from '~src/components/SequencePageSettings/SequencePageSettings';
import SequencePageSteps from '~src/components/SequencePageSteps/SequencePageSteps';
import useCreateOrUpdateSequence from '~src/hooks/useCreateOrUpdateSequence';
import { usePrompt } from '~src/hooks/usePrompt';
import useYouSure from '~src/hooks/useYouSure';
import { useGetFoldersQuery } from '~src/store/api/folders';
import { useCreateOrUpdateSequenceMutation, useLazySendLogQuery } from '~src/store/api/sequences';
import { addHtmlTemplates } from '~src/store/slices/commonSlice';
import {
  clearSelectedIds,
  searchValueContactPage,
  setCurrentContactPage,
} from '~src/store/slices/contactsSlice';
import {
  doneMaster,
  initMaster,
  saveFolderIdSequence,
  saveNameSequence,
  saveTimeZoneSequence,
  setLogStartNameSequence,
} from '~src/store/slices/sequenceMasterSlice';

import './ModalMasterTabsSequence.scss';

const ModalMasterTabsSequence = ({ onClose, sequenceId = null }) => {
  const dispatch = useDispatch();

  const { tryClose, tryForceClose, setIsChanged } = useYouSure(onClose);

  const [ activeTabId, setActiveTabId ] = useState(0);

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
        (item) => item.id === sequenceId,
      );

      dispatch(initMaster(currentSequence));
    }
  }, [ sequenceId, cachedSequences ]);

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
