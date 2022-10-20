import { useCallback, useEffect, useState } from "react";
import { useLazyGetNotificationsQuery } from "store/api/notifications";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateChatByNotification } from "store/slices/commonSlice";
import { setActiveChatId } from "store/slices/inboxSlice";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useFetchNotifications = () => {
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const activeChatId = useSelector((state) => state.inbox.activeChatId);

  const [getNotifications, { data: notifications, isSuccess }] =
    useLazyGetNotificationsQuery();

  useEffect(() => {
    if (isStarted) {
      getNotifications();

      const interval = setInterval(() => {
        getNotifications();
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isStarted]);

  const goToChat = useCallback((chat) => {
    history.push("/admin/inbox");
    dispatch(setActiveChatId(chat.Contact.id));
  }, []);

  console.log("getNotifications", isSuccess);

  useEffect(() => {
    if (isSuccess && notifications) {
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
  }, [isSuccess, notifications]);

  return () => setIsStarted(true);
};

export default useFetchNotifications;
