import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { 
  useGetCommonInfoQuery, 
  useLazyGetCommonInfoQuery,
} from '~src/store/api/common';
import { 
  setAccountSettings, 
  setChats, 
  setCommonInfoHtmlTemplates, 
  setCommonInfoTasks, 
  setFolders, 
  setInMailSettingsStatus, 
} from '~src/store/slices/commonSlice';

const useFetchCommon = () => {
  const dispatch = useDispatch();
  const [ getCommonInfo, { data: commonData, isSuccess } ] =
    useLazyGetCommonInfoQuery();

  useEffect(() => {
    if (commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoHtmlTemplates(commonData.Templates));
      dispatch(setFolders(commonData.Folders));
      dispatch(setChats(commonData.Chats));
      dispatch(setAccountSettings(commonData.AccountSettings));
      if ((commonData.Account || {}).InMailSettings) {
        const emailServerCreds = (
          (JSON.parse(localStorage.getItem('Account')) || {}).InMailSettings ||
          {}
        ).Creds;

        dispatch(
          setInMailSettingsStatus({
            ...commonData.Account.InMailSettings,
            Creds: emailServerCreds,
          }),
        );
      } else {
        dispatch(setInMailSettingsStatus(null));
      }
    }
  }, [commonData]);

  return getCommonInfo;
};

export default useFetchCommon;
