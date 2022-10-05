import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { useLazyGetTasksQuery } from "store/api/tasks";
import { useSkipTaskMutation } from "store/api/tasks";
import { useReplyTaskMutation } from "store/api/tasks";
import { useExecuteTaskMutation } from "store/api/tasks";
import { useLazyGetStatisticsOfTasksQuery } from "store/api/tasks";
import { setCommonInfoHtmlTemplates } from "store/slices/commonSlice";
import { setCurrentUser } from "store/slices/commonSlice";
import { setStatistickInfo } from "store/slices/commonSlice";
import { setCommonInfoTasks } from "store/slices/commonSlice";

const CommonThings = () => {
  const dispatch = useDispatch();

  const isFetchingTasks = useSelector((state) => state.tasks.isFetching);

  const [, { isSuccess: isExecutedTask }] = useExecuteTaskMutation({
    fixedCacheKey: "execute-task",
  });
  const [, { isSuccess: isSkipedTask }] = useSkipTaskMutation({
    fixedCacheKey: "skip-task",
  });
  const [, { isSuccess: isRepliedTask }] = useReplyTaskMutation({
    fixedCacheKey: "reply-task",
  });
  const [getCommonInfo, { data: commonData }] = useLazyGetCommonInfoQuery();
  const [fetchStatistics, { data: statisticsData }] =
    useLazyGetStatisticsOfTasksQuery();

  useEffect(() => {
    getCommonInfo();
    fetchStatistics();

    const Account = localStorage.getItem("Account");
    if (Account) {
      dispatch(setCurrentUser(JSON.parse(Account)));
    }
  }, []);

  useEffect(() => {
    if (isExecutedTask || isSkipedTask || isFetchingTasks || isRepliedTask) {
      fetchStatistics();
    }
  }, [isExecutedTask, isSkipedTask, isFetchingTasks, isRepliedTask]);

  useEffect(() => {
    if (commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoHtmlTemplates(commonData.HtmlTemplates));
      commonData.Account && saveUserToLocalStorage(commonData.Account);
      if (commonData.Account) {
        dispatch(setCurrentUser(commonData.Account));
      }
    }
  }, [commonData]);

  useEffect(() => {
    statisticsData && dispatch(setStatistickInfo(statisticsData));
  }, [statisticsData]);

  const saveUserToLocalStorage = (Account) => {
    localStorage.setItem("Account", JSON.stringify(Account));
  };

  return <></>;
};

export default CommonThings;
