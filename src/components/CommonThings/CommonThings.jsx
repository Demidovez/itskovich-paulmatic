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
import { setInMailSettingsStatus } from "store/slices/commonSlice";
import { setAccountSettings } from "store/slices/commonSlice";

const CommonThings = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // done
  const location = useLocation(); // done

  const isFetchingTasks = useSelector((state) => state.tasks.isFetching); // done
  const activeChatId = useSelector((state) => state.inbox.activeChatId); // done

  const [, { isSuccess: isExecutedTask }] = useExecuteTaskMutation({
    fixedCacheKey: "execute-task",
  }); // done
  const [, { isSuccess: isSkipedTask }] = useSkipTaskMutation({
    fixedCacheKey: "skip-task",
  }); // done
  const [, { isSuccess: isRepliedTask }] = useReplyTaskMutation({
    fixedCacheKey: "reply-task",
  }); // done
  const [getNotifications, { data: notifications }] =
    useLazyGetNotificationsQuery(); // done
  const [getCommonInfo, { data: commonData }] = useLazyGetCommonInfoQuery(); // done
  const [fetchStatistics, { data: statisticsData, isLoading }] =
    useLazyGetStatisticsOfTasksQuery(); // done

  // done
  useEffect(() => {
    statisticsData && dispatch(setStatistickInfo(statisticsData));
  }, [statisticsData]);

  useEffect(() => {
    getCommonInfo(); //done
    fetchStatistics(); // done

    getNotifications(); //done

    // done
    const interval = setInterval(() => {
      getNotifications();
    }, 15000);

    // done
    return () => clearInterval(interval);
  }, []);

  // done
  const goToChat = (chat) => {
    history.push("/admin/inbox");
    dispatch(setActiveChatId(chat.Contact.id));
  };

  // done
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

  // done
  useEffect(() => {
    if (isExecutedTask || isSkipedTask || isFetchingTasks || isRepliedTask) {
      fetchStatistics();
    }
  }, [isExecutedTask, isSkipedTask, isFetchingTasks, isRepliedTask]);

  // done
  useEffect(() => {
    if (commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoHtmlTemplates(commonData.Templates));
      dispatch(setFolders(commonData.Folders));
      dispatch(setChats(commonData.Chats));
      dispatch(setAccountSettings(commonData.AccountSettings));
      if ((commonData.Account || {}).InMailSettings) {
        const emailServerCreds = (
          (JSON.parse(localStorage.getItem("Account")) || {}).InMailSettings ||
          {}
        ).Creds;

        dispatch(
          setInMailSettingsStatus({
            ...commonData.Account.InMailSettings,
            Creds: emailServerCreds,
          })
        );
      } else {
        dispatch(setInMailSettingsStatus(null));
      }
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
