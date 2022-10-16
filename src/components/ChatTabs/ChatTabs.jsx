import { useState } from "react";
import "./ChatTabs.scss";

const ChatTabs = ({ className }) => {
  const [tabs] = useState([
    {
      id: 0,
      label: "Все",
      name: "all",
    },
    {
      id: 1,
      label: "Непрочитанные",
      name: "unread",
    },
    {
      id: 2,
      label: "Заинтересованные",
      name: "interested",
    },
    {
      id: 3,
      label: "Встреча",
      name: "meeting",
    },
  ]);

  const [activeTab, setActiveTable] = useState("all");

  return (
    <div
      className={`chat-tabs-component d-flex ml-3 align-items-center h-100 ${className}`}
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`chat-tab pl-3 pr-3 ${
            activeTab === tab.name ? "active" : ""
          }`}
          onClick={() => setActiveTable(tab.name)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default ChatTabs;
