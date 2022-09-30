import TaskModalManualEmail from "components/TaskModalManualEmail/TaskModalManualEmail";

const TasksModals = ({ task, onClose, onExecute, onSkip }) => {
  let Modal;

  if (task === null) return;

  switch (task.Type) {
    case "manual_email":
      Modal = TaskModalManualEmail;
      break;
    default:
      Modal = null;
  }

  return (
    <>
      {Modal && (
        <Modal
          task={task}
          onClose={onClose}
          onExecute={onExecute}
          onSkip={onSkip}
        />
      )}
    </>
  );
};

export default TasksModals;
