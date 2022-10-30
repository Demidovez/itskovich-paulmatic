import TaskModalManualEmail from "components/TaskModalManualEmail/TaskModalManualEmail";
import TaskModalMessanger from "components/TaskModalMessanger/TaskModalMessanger";
import React, { useEffect } from "react";

const TasksModals = ({ task, onClose, onExecute, onSkip, onReplied }) => {
  let Modal;

  if (task === null) return;

  switch (task.Type) {
    case "manual_email":
      Modal = (props) => <TaskModalManualEmail {...props} />;
      break;
    case "whatsapp":
    case "telegram":
    case "linkedin":
      Modal = (props) => <TaskModalMessanger {...props} />;
      break;
    default:
      Modal = null;
  }

  return (
    <Modal
      task={task}
      onClose={onClose}
      onExecute={onExecute}
      onSkip={onSkip}
      onReplied={onReplied}
    />
  );
};

export default React.memo(TasksModals, (prevProps, nextProps) => {
  return prevProps.task === nextProps.task;
});
