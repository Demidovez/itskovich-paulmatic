import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setActiveFolderId } from "store/slices/inboxSlice";
import "./ChatFolders.scss";

const ChatFolders = ({ className }) => {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.common.Chats.Folders);
  const activeFolder = useSelector((state) => state.inbox.activeFolderId);

  return (
    <div
      className={`chat-folders-component d-flex ml-3 align-items-center h-100 ${className}`}
    >
      {folders.map((folder) => (
        <div
          key={folder.id}
          className={`chat-folder pl-3 pr-3 ${
            activeFolder === folder.id ? "active" : ""
          }`}
          onClick={() => dispatch(setActiveFolderId(folder.id))}
        >
          {folder.Name}
        </div>
      ))}
    </div>
  );
};

export default ChatFolders;
