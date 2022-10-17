import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { useLazyGetNotificationsQuery } from "store/api/notifications";
import {
  useSkipTaskMutation,
  useReplyTaskMutation,
  useExecuteTaskMutation,
  useLazyGetStatisticsOfTasksQuery,
} from "store/api/tasks";
import {
  setCommonInfoHtmlTemplates,
  setFolders,
  setCurrentUser,
  setStatistickInfo,
  setCommonInfoTasks,
  setChats,
} from "store/slices/commonSlice";
import { toast } from "react-toastify";
import { setLoaderStatus } from "store/slices/commonSlice";
import { updateChatByNotification } from "store/slices/commonSlice";

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
  const [getNotifications, { data: notifications }] =
    useLazyGetNotificationsQuery();
  const [getCommonInfo, { data: commonData }] = useLazyGetCommonInfoQuery();
  const [fetchStatistics, { data: statisticsData, isLoading }] =
    useLazyGetStatisticsOfTasksQuery();

  useEffect(() => {
    statisticsData && dispatch(setStatistickInfo(statisticsData));
  }, [statisticsData]);

  useEffect(() => {
    getCommonInfo();
    fetchStatistics();

    const Account = localStorage.getItem("Account");
    if (Account) {
      dispatch(setCurrentUser(JSON.parse(Account)));
    }

    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notifications) {
      notifications.forEach((notification) => {
        if (notification.Type === "chat_msg") {
          dispatch(updateChatByNotification(notification));
        }

        if (notification.Type === "chat_msg" && notification.Object.Msgs[0].My)
          return;

        toast(
          () => (
            <div
              style={{
                backgroundColor: notification.Alertness || "var(--primary)",
                padding: 15,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 14,
                  paddingBottom: 10,
                  fontWeight: 600,
                }}
              >
                {notification.Subject}
              </div>
              <div style={{ color: "white", fontSize: 13 }}>
                {notification.Message}
              </div>
            </div>
          ),
          {
            className: "notification",
          }
        );
      });
    }
  }, [JSON.stringify(notifications)]);

  useEffect(() => {
    if (isExecutedTask || isSkipedTask || isFetchingTasks || isRepliedTask) {
      fetchStatistics();
    }
  }, [isExecutedTask, isSkipedTask, isFetchingTasks, isRepliedTask]);

  useEffect(() => {
    if (commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoHtmlTemplates(commonData.Templates));
      dispatch(setFolders(commonData.Folders));
      dispatch(setChats(commonData.Chats));
      commonData.Account && saveUserToLocalStorage(commonData.Account);
      if (commonData.Account) {
        dispatch(setCurrentUser(commonData.Account));
      }
    }
  }, [commonData]);

  const saveUserToLocalStorage = (Account) => {
    localStorage.setItem("Account", JSON.stringify(Account));
  };

  return <></>;
};

export default CommonThings;
