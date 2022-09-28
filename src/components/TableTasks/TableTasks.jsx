import { Card, CardHeader, CardFooter, Table, Label, Col } from "reactstrap";
import FilterB2B from "../FilterB2B/FilterB2B";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HiddenTableCell from "components/HiddenTableCell/HiddenTableCell";
import { setCurrentPage } from "store/slices/b2bFilterSlice";
import { setSearchValue } from "store/slices/b2bFilterSlice";
import ActionTableBar from "components/ActionTableBar/ActionTableBar";
import { clearSelectedIds } from "store/slices/tablesSlice";
import { useGetCompaniesState } from "store/api/companies";
import { setCache, addSelectedId } from "store/slices/tablesSlice";
import "./TableTasks.scss";
import Checkbox from "components/Checkbox/Checkbox";
import { addTasksId } from "store/slices/tasksSlice";

const COUNT_ON_PAGE = 10;

const fields = [
  {
    label: "",
    name: "checkbox",
    style: {
      width: "5%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Тип",
    name: "type",
    style: {
      width: "4%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Время",
    name: "time",
    style: {
      fontSize: 12,
      width: "5%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Задача",
    name: "task",
    style: {
      width: "35%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Описание",
    name: "description",
    style: {
      width: "36%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Статус",
    name: "status",
    style: {
      width: "14%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
];

const demo = [
  {
    id: 0,
    type: "linkedin",
    time: "10:30",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Антон Ицкович",
    status: "Завершено",
  },
  {
    id: 1,
    type: "linkedin",
    time: "12:35",
    task: "Посмотреть профиль LinkedIn",
    description: "Начать диалог с пользователем по представленному алгоритму",
    author: "Николай Демидовец",
    status: "Срок сдачи 5 минут",
  },
  {
    id: 2,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 3,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 4,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 5,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 6,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 7,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 8,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 9,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
  {
    id: 10,
    type: "linkedin",
    time: "19:50",
    task: "Посмотреть профиль LinkedIn",
    description: "Зайти на страницу профиля и подписаться",
    author: "Иван Иванов",
    status: "Срок сдачи 10 минут",
  },
];

const TableTasks = ({ info, data = demo, fetchData }) => {
  const dispatch = useDispatch();

  const { isSelectedAll, selectedIds } = useSelector((state) => state.tasks);

  const onSelectTask = (id) => dispatch(addTasksId(id));

  return (
    <>
      <div className="table-tasks-component h-100 overflow-auto">
        <Table
          className="align-items-center table-hover fixed-header"
          responsive
          style={{ tableLayout: "auto" }}
        >
          <tbody>
            {data.map((task) => (
              <tr key={task.id} className="d-flex">
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
                  } else if (field.name === "type") {
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
                        {task[field.name] === "linkedin" ? (
                          <i className="fab fa-linkedin"></i>
                        ) : (
                          task[field.name]
                        )}
                      </td>
                    );
                  } else if (field.name === "task") {
                    return (
                      <td
                        key={field.name}
                        className="p-3 d-flex align-items-center"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 15,
                          fontWeight: 100,
                          ...field.style,
                        }}
                      >
                        <strong className="pr-1 ">{task[field.name]}</strong> -{" "}
                        {task.author}
                      </td>
                    );
                  } else if (field.name === "author") {
                    return null;
                  } else {
                    return (
                      <td
                        key={field.name}
                        className="p-3 d-flex align-items-center"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 15,
                          fontWeight: 100,
                          ...field.style,
                        }}
                      >
                        {task[field.name]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>

        {data.length === 0 && <p className="message">Не найдено :(</p>}
      </div>
      <CardFooter className="d-flex justify-content-between align-items-center">
        <div></div>
        <Pagination
          allCount={data.length || 0}
          countOnPage={COUNT_ON_PAGE}
          page={0}
          moveToPage={() => {}}
        />
      </CardFooter>
    </>
  );
};

export default React.memo(TableTasks);
