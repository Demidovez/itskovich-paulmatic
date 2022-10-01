import TaskModalManualEmail from "components/TaskModalManualEmail/TaskModalManualEmail";
import TaskModalMessanger from "components/TaskModalMessanger/TaskModalMessanger";

const TasksModals = ({ task, onClose, onExecute, onSkip }) => {
  let Modal;

  if (task === null) return;

  switch (task.Type) {
    case "manual_email":
      Modal = (props) => <TaskModalManualEmail {...props} />;
      break;
    case "whatsapp":
    case "telegram":
      Modal = (props) => <TaskModalMessanger {...props} />;
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
