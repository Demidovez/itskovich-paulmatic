import { useCallback, useEffect, useState } from "react";
import { useLazyGetNotificationsQuery } from "~src/store/api/notifications";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { updateChatByNotification } from "~src/store/slices/commonSlice";
import { setActiveChatId } from "~src/store/slices/inboxSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "~src/routes";
import { getpath } from "~src/utils/utils";
import { 
  updateAccount,
  setShowTariffModal 
} from "~src/store/slices/commonSlice";

const useFetchNotifications = () => {
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    navigate("/admin" + getpath(ROUTES.inbox.path));
    dispatch(setActiveChatId(chat.Contact.id));
  }, []);

  useEffect(() => {
    if (isSuccess && notifications) {
      notifications.forEach((notification) => {
        if (notification.Type === "chat_msg") {
          dispatch(updateChatByNotification(notification));
        }

        if (
          notification.Type === "chat_msg" &&
          (notification.Object.Msgs[0].My ||
            (location.pathname.includes("/inbox") &&
              activeChatId === notification.Object.Contact.id))
        ) {
          return;
        }

        if (notification.Type === "account_updated") {
          console.log("account_updated");
          dispatch(updateAccount(notification.Object));

          return;
        }

        if (notification.Type === "feature_unaccessable") {
          console.log("feature_unaccessable");
          dispatch(setShowTariffModal(true));

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
