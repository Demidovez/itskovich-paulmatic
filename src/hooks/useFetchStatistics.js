import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLazyGetStatisticsOfTasksQuery } from "store/api/tasks";
import { setStatistickInfo } from "store/slices/commonSlice";

const useFetchStatistics = () => {
  const dispatch = useDispatch();

  const [fetchStatistics, { data: statisticsData }] =
    useLazyGetStatisticsOfTasksQuery();

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

  useEffect(() => {
    statisticsData && dispatch(setStatistickInfo(statisticsData));
  }, [JSON.stringify(statisticsData)]);

  useEffect(() => {
    if (isExecutedTask || isSkipedTask || isFetchingTasks || isRepliedTask) {
      fetchStatistics();
    }
  }, [isExecutedTask, isSkipedTask, isFetchingTasks, isRepliedTask]);

  return fetchStatistics;
};

export default useFetchStatistics;
