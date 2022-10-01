import { Card, CardHeader, CardFooter, Table, Label, Col } from "reactstrap";
import Pagination from "../Pagination/Pagination";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TasksTable.scss";
import Checkbox from "components/Checkbox/Checkbox";
import { addTasksId } from "store/slices/tasksSlice";
import { useLazyGetTasksQuery } from "store/api/tasks";
import TaskIcon from "components/TaskIcon/TaskIcon";
import TaskStatus from "components/TaskStatus/TaskStatus";
import moment from "moment";
import "moment/locale/ru";
import TaskStartTime from "components/TaskStartTime/TaskStartTime";
import TasksModals from "components/TasksModals/TasksModals";
import { useState } from "react";
import { useExecuteTaskMutation } from "store/api/tasks";
import { useSkipTaskMutation } from "store/api/tasks";
import { setCurrentTasksPage } from "store/slices/tasksSlice";
import { setCache } from "store/slices/tablesSlice";
import { setTasksToCache } from "store/slices/tasksSlice";
import { executeCachedTask } from "store/slices/tasksSlice";
import { skipCachedTask } from "store/slices/tasksSlice";

moment.locale("ru");

const COUNT_ON_PAGE = 10;

const fields = [
  {
    label: "",
    name: "checkbox",
    style: {
      width: "4%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Тип",
    name: "Type",
    style: {
      width: "4%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Время",
    name: "StartTime",
    style: {
      fontSize: 14,
      width: "7%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Задача",
    name: "Name",
    style: {
      width: "30%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Описание",
    name: "Description",
    style: {
      width: "40%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Статус",
    name: "Status",
    style: {
      width: "14%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
];

const TasksTable = ({ info, fetchData }) => {
  const cached = useSelector((state) => state.tasks.cached);
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const [taskToModal, setTaskToModal] = useState(null);

  const [getTasks, { data: tasks, isFetching }] = useLazyGetTasksQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tasks && !isFetching) {
      dispatch(setTasksToCache(tasks));
    }
  }, [isFetching, tasks]);

  const [executeTask] = useExecuteTaskMutation({
    fixedCacheKey: "execute-task",
  });
  const [skipTask] = useSkipTaskMutation({
    fixedCacheKey: "skip-task",
  });

  const { isSelectedAll, selectedIds } = useSelector((state) => state.tasks);

  const onSelectTask = (id) => dispatch(addTasksId(id));

  useEffect(() => {
    getTasks();

    const intervalId = setInterval(() => {
      console.log("request of tasks");
      getTasks();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const openModal = (task) => {
    setTaskToModal(task);
  };

  const closeModal = () => {
    setTaskToModal(null);
  };

  const onExecuteTask = (task) => {
    if (task) {
      executeTask(task);
      dispatch(
        executeCachedTask({ ...task, Status: "completed", Alertness: "gray" })
      );
    }

    setTaskToModal(null);
  };

  const onSkipTask = (task) => {
    if (task) {
      skipTask(task);
      dispatch(
        skipCachedTask({ ...task, Status: "skipped", Alertness: "gray" })
      );
    }

    setTaskToModal(null);
  };

  const onSetCurrentPage = (page) => {
    dispatch(setCurrentTasksPage(page));
  };

  return (
    <>
      <div className="table-tasks-component h-100 overflow-auto">
        <Table
          className="align-items-center table-hover fixed-header"
          responsive
          style={{ tableLayout: "auto" }}
        >
          <tbody>
            {(cached || tasks || []).map((task) => (
              <tr
                key={task.id}
                className="d-flex"
                onClick={() => openModal(task)}
              >
                {fields.map((field) => {
                  if (field.name === "checkbox") {
                    return (
                      <td
                        className="p-0 pl-4 d-flex align-items-center"
                        key={field.name}
                        style={{
                          ...field.style,
                        }}
                      >
                        <Checkbox
                          key={field.name}
                          id={task.id}
                          checked={
                            selectedIds.includes(task.id) || isSelectedAll
                          }
                          onChange={() => onSelectTask(task.id)}
                        />
                      </td>
                    );
                  } else if (field.name === "StartTime") {
                    return (
                      <td
                        key={field.name}
                        className="p-3 d-flex align-items-center"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 30,
                          fontWeight: 400,
                          ...field.style,
                        }}
                      >
                        <TaskStartTime time={task[field.name]} />
                      </td>
                    );
                  } else if (field.name === "Type") {
                    return (
                      <td
                        key={field.name}
                        className="p-3 d-flex align-items-center"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 30,
                          fontWeight: 100,
                          ...field.style,
                        }}
                      >
                        <TaskIcon type={task[field.name]} />
                      </td>
                    );
                  } else if (field.name === "Name") {
                    return (
                      <td
                        key={field.name}
                        className="p-3 pr-3 d-flex align-items-center"
                        style={{
                          ...field.style,
                        }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            fontSize: 15,
                            fontWeight: 400,
                            textOverflow: "ellipsis",
                            width: `calc(100%)`,
                          }}
                        >
                          <strong className="pr-1 ">{task[field.name]}</strong>{" "}
                          - {task.Contact.name}
                        </div>
                      </td>
                    );
                  } else if (field.name === "Status") {
                    return (
                      <td
                        key={field.name}
                        className="p-3 d-flex align-items-center"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 15,
                          fontWeight: 400,
                          ...field.style,
                        }}
                      >
                        <TaskStatus
                          status={task[field.name]}
                          dueTime={task.DueTime}
                          color={task.Alertness}
                        />
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={field.name}
                        className="p-3 d-flex align-items-center"
                        style={{
                          ...field.style,
                          width: `calc(${field.style.width})`,
                        }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            fontSize: 15,
                            fontWeight: 400,
                            textOverflow: "ellipsis",
                            width: `calc(100%)`,
                          }}
                        >
                          {task[field.name]}
                        </div>
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>

        {(cached || tasks || []).length === 0 && (
          <p className="message">Не найдено :(</p>
        )}
      </div>
      <CardFooter className="d-flex justify-content-between align-items-center">
        <div></div>
        <Pagination
          allCount={(cached || tasks || []).length}
          countOnPage={COUNT_ON_PAGE}
          page={currentPage}
          moveToPage={onSetCurrentPage}
        />
      </CardFooter>
      <TasksModals
        task={taskToModal}
        onClose={closeModal}
        onExecute={onExecuteTask}
        onSkip={onSkipTask}
      />
    </>
  );
};

export default TasksTable;
