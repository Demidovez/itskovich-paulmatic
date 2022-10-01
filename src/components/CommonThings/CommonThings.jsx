import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { useSkipTaskMutation } from "store/api/tasks";
import { useExecuteTaskMutation } from "store/api/tasks";
import { useLazyGetStatisticsOfTasksQuery } from "store/api/tasks";
import { setStatistickInfo } from "store/slices/commonSlice";
import { setCommonInfo } from "store/slices/commonSlice";

const CommonThings = () => {
  const dispatch = useDispatch();

  const [, { isSuccess: isExecutedTask }] = useExecuteTaskMutation({
    fixedCacheKey: "execute-task",
  });
  const [, { isSuccess: isSkipedTask }] = useSkipTaskMutation({
    fixedCacheKey: "skip-task",
  });
  const [getCommonInfo, { data: commonData }] = useLazyGetCommonInfoQuery();
  const [fetchStatistics, { data: statisticsData }] =
    useLazyGetStatisticsOfTasksQuery();

  useEffect(() => {
    getCommonInfo();
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (isExecutedTask || isSkipedTask) {
      fetchStatistics();
    }
  }, [isExecutedTask, isSkipedTask]);

  useEffect(() => {
    commonData && dispatch(setCommonInfo(commonData));
  }, [commonData]);

  useEffect(() => {
    statisticsData && dispatch(setStatistickInfo(statisticsData));
  }, [statisticsData]);

  return <></>;
};

export default CommonThings;
