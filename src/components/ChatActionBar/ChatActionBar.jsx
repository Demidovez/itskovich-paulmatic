import DropdownWithIcon from "components/DropdownWithIcon/DropdownWithIcon";
import ModalYouSure from "components/ModalYouSure/ModalYouSure";
import { useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useLazyDeleteChatQuery } from "store/api/inbox";
import { useLazyMoveToFolderQuery } from "store/api/inbox";
import { deleteChat } from "store/slices/commonSlice";
import { moveChatToFolder } from "store/slices/commonSlice";
import { clearActiveChatId } from "store/slices/inboxSlice";

const ChatActionBar = () => {
  const dispatch = useDispatch();

  const activeChatId = useSelector((state) => state.inbox.activeChatId);
  const folders = useSelector((state) => state.common.Chats.Folders);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isAskSure, setIsAskSure] = useState(false);

  const [moveToFolder] = useLazyMoveToFolderQuery();

  const [tryDeleteChat] = useLazyDeleteChatQuery();

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => setIsShow(true), 0);
    } else {
      setIsShow(false);
    }
  }, [dropdownOpen]);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const onMoveToFolder = (folderId) => {
    moveToFolder({ chatId: activeChatId, folderId });
    dispatch(moveChatToFolder({ folderId, activeChatId }));
  };

  const removeChat = () => {
    dispatch(deleteChat(activeChatId));
    dispatch(clearActiveChatId());
    setIsAskSure(false);
    tryDeleteChat(activeChatId);
  };

  return (
    <>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        direction="down"
        className="editor-btn mr-2 ml-4"
        disabled={activeChatId < 0}
        style={{ opacity: activeChatId >= 0 ? 1 : 0.6 }}
      >
        <DropdownToggle outline color="primary" size="sm">
          <div className="d-flex align-items-center">
            <BsListTask size="1.0rem" />
            <span>Действия</span>
            <MdArrowDropDown size="1.5rem" className="ml-0" />
          </div>
        </DropdownToggle>
        <DropdownMenu style={{ opacity: isShow ? 1 : 0, minWidth: "100%" }}>
          <DropdownItem
            onClick={() => onMoveToFolder(0)}
            style={{ fontSize: 12 }}
          >
            Переместить в «Все»
          </DropdownItem>
          {(folders || [])
            .filter((folder) => !["Все", "Финальные"].includes(folder.Name))
            .map((folder) => (
              <DropdownItem
                onClick={() => onMoveToFolder(folder.id)}
                style={{ fontSize: 12 }}
                key={folder.id}
              >
                Переместить в «{folder.Name}»
              </DropdownItem>
            ))}

          <DropdownItem
            onClick={() => setIsAskSure(true)}
            style={{ fontSize: 12 }}
          >
            Удалить переписку
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ModalYouSure
        isShow={isAskSure}
        title={"Удалить диалог"}
        text={"Вы действительно хотите удалить диалог?"}
        onAgree={removeChat}
        onCancel={() => {
          setDropdownOpen(false);
          setIsAskSure(false);
        }}
      />
    </>
  );
};

export default ChatActionBar;
