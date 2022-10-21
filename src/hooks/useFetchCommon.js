import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCommonInfoQuery } from "store/api/common";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { setAccountSettings } from "store/slices/commonSlice";
import { setChats } from "store/slices/commonSlice";
import { setInMailSettingsStatus } from "store/slices/commonSlice";
import { setFolders } from "store/slices/commonSlice";
import { setCommonInfoHtmlTemplates } from "store/slices/commonSlice";
import { setCommonInfoTasks } from "store/slices/commonSlice";

const useFetchCommon = () => {
  const dispatch = useDispatch();
  const [getCommonInfo, { data: commonData, isSuccess }] =
    useLazyGetCommonInfoQuery();

  useEffect(() => {
    if (isSuccess && commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoHtmlTemplates(commonData.Templates));
      dispatch(setFolders(commonData.Folders));
      dispatch(setChats(commonData.Chats));
      dispatch(setAccountSettings(commonData.AccountSettings));
      dispatch(
        setInMailSettingsStatus(
          (commonData.Action || {}).InMailSettings ? "saved" : "none"
        )
      );
    }
  }, [isSuccess, commonData]);

  return getCommonInfo;
};

export default useFetchCommon;
