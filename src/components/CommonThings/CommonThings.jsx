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
  setStatistickInfo,
  setCommonInfoTasks,
  setChats,
  updateChatByNotification,
} from "store/slices/commonSlice";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { setActiveChatId } from "store/slices/inboxSlice";
import { Events } from "react-scroll";
import { clearSearchMessageId } from "store/slices/inboxSlice";

const CommonThings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isFetchingTasks = useSelector((state) => state.tasks.isFetching);
  const activeChatId = useSelector((state) => state.inbox.activeChatId);

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

    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const goToChat = (chat) => {
    history.push("/admin/inbox");
    dispatch(setActiveChatId(chat.Contact.id));
  };

  useEffect(() => {
    if (notifications) {
      notifications.forEach((notification) => {
        if (notification.Type === "chat_msg") {
          dispatch(updateChatByNotification(notification));
        }

        if (
          notification.Type === "chat_msg" &&
          (notification.Object.Msgs[0].My ||
            (location.pathname.includes("admin/inbox") &&
              activeChatId === notification.Object.Contact.id))
        ) {
          return;
        }

        toast(
          () => (
            <div
              style={{
                backgroundColor: notification.Alertness || "var(--primary)",
                padding: 15,
              }}
              onClick={
                notification.Type === "chat_msg"
                  ? () => goToChat(notification.Object)
                  : () => {}
              }
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
                {notification.Type === "chat_msg"
                  ? notification.Object.Msgs[0].PlainBodyShort
                  : notification.Message}
              </div>
            </div>
          ),
          {
            className: "notification",
            // autoClose: false,
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
    }
  }, [commonData]);

  useEffect(() => {
    Events.scrollEvent.register("end", function (to, element) {
      if (to === "message_searched") {
        setTimeout(() => {
          element.classList.remove("searched-message");
          dispatch(clearSearchMessageId());
        }, 2000);
      }
    });

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  return <></>;
};

export default CommonThings;
