import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Events } from 'react-scroll';
import { toast } from 'react-toastify';

import { ROUTES } from '~src/routes';
import { useLazyGetCommonInfoQuery } from '~src/store/api/common';
import { useLazyGetNotificationsQuery } from '~src/store/api/notifications';
import {
  useExecuteTaskMutation,
  useLazyGetStatisticsOfTasksQuery,
  useReplyTaskMutation,
  useSkipTaskMutation,
} from '~src/store/api/tasks';
import { setAccountSettings, setChats,
  setCommonInfoContacts,
  setCommonInfoHtmlTemplates,
  setCommonInfoTasks,
  setFolders,  
  setInMailSettingsStatus, 
  setShowTariffModal,
  setStatistickInfo, 
  setTimeZones, 
  updateAccount,  
  updateChatByNotification, 
  updateChatByOneMessageHiddenly } from '~src/store/slices/commonSlice';
import { clearSearchMessageId, setActiveChatId } from '~src/store/slices/inboxSlice';
import { getpath } from '~src/utils/utils';

const CommonThings = () => {
  const dispatch = useDispatch();
  const history = useNavigate(); // done
  const location = useLocation(); // done

  const isFetchingTasks = useSelector((state) => state.tasks.isFetching); // done
  const activeChatId = useSelector((state) => state.inbox.activeChatId); // done

  const [ , { isSuccess: isExecutedTask } ] = useExecuteTaskMutation({
    fixedCacheKey: 'execute-task',
  }); // done
  const [ , { isSuccess: isSkipedTask } ] = useSkipTaskMutation({
    fixedCacheKey: 'skip-task',
  }); // done
  const [ , { isSuccess: isRepliedTask } ] = useReplyTaskMutation({
    fixedCacheKey: 'reply-task',
  }); // done
  const [ getNotifications, { data: notifications } ] =
    useLazyGetNotificationsQuery(); // done
  const [ getCommonInfo, { data: commonData } ] = useLazyGetCommonInfoQuery(); // done
  const [ fetchStatistics, { data: statisticsData, isLoading } ] =
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
    history('/admin' + getpath(ROUTES.inbox.path));
    dispatch(setActiveChatId(chat.Contact.id));
  };

  // done
  useEffect(() => {
    if (notifications) {
      notifications.forEach((notification) => {
        if (notification.Type === 'chat_msg') {
          dispatch(updateChatByNotification(notification));
        }

        if (
          notification.Type === 'chat_msg' &&
          (notification.Object.Msgs[0].My ||
            (location.pathname.includes('/inbox') &&
              activeChatId === notification.Object.Contact.id))
        ) {
          return;
        }

        if (notification.Type === 'account_updated') {
          console.log('account_updated');
          dispatch(updateAccount(notification.Object));

          return;
        }

        if (notification.Type === 'feature_unaccessable') {
          console.log('feature_unaccessable');
          dispatch(setShowTariffModal(true));

          return;
        }

        if (notification.Type === 'chat_msg_updated') {
          console.log('chat_msg_updated');
          dispatch(updateChatByOneMessageHiddenly(notification.Object));
        }

        toast(
          () => (
            <div
              style={{
                backgroundColor: notification.Alertness || 'var(--primary)',
                padding: 15,
              }}
              onClick={
                notification.Type === 'chat_msg'
                  ? () => goToChat(notification.Object)
                  : () => {}
              }
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 14,
                  paddingBottom: 10,
                  fontWeight: 600,
                }}
              >
                {notification.Subject}
              </div>
              <div style={{ color: 'white', fontSize: 13 }}>
                {notification.Type === 'chat_msg'
                  ? notification.Object.Msgs[0].PlainBodyShort
                  : notification.Message}
              </div>
            </div>
          ),
          {
            className: 'notification',
            // autoClose: false,
          },
        );
      });
    }
  }, [JSON.stringify(notifications)]);

  // done
  useEffect(() => {
    if (isExecutedTask || isSkipedTask || isFetchingTasks || isRepliedTask) {
      fetchStatistics();
    }
  }, [ isExecutedTask, isSkipedTask, isFetchingTasks, isRepliedTask ]);

  // done
  useEffect(() => {
    if (commonData) {
      dispatch(setCommonInfoTasks(commonData.Tasks));
      dispatch(setCommonInfoContacts(commonData.Contacts));
      dispatch(setCommonInfoHtmlTemplates(commonData.Templates));
      dispatch(setFolders(commonData.Folders));
      dispatch(setTimeZones(commonData.TimeZones));
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

  useEffect(() => {
    Events.scrollEvent.register('end', function(to, element) {
      if (to === 'message_searched') {
        setTimeout(() => {
          element.classList.remove('searched-message');
          dispatch(clearSearchMessageId());
        }, 2000);
      }
    });

    return () => {
      Events.scrollEvent.remove('end');
    };
  }, []);

  return <></>;
};

export default CommonThings;
