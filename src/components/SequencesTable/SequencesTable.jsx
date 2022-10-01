import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Label,
  Col,
  Progress,
} from "reactstrap";
import Pagination from "../Pagination/Pagination";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SequencesTable.scss";
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

const COUNT_ON_PAGE = 10;

const fields = [
  {
    label: "",
    name: "checkbox",
    style: {
      width: "5%",
      minWidth: "45px",
      maxWidth: "500px",
    },
  },
  {
    label: "",
    name: "switch",
    style: {
      width: "7%",
      minWidth: "100px",
      maxWidth: "500px",
    },
  },
  {
    label: "Название",
    name: "title",
    style: {
      width: "30%",
      minWidth: "0px",
      maxWidth: "500px",
    },
  },
  {
    label: "Люди",
    name: "people",
    style: {
      width: "9%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Open rate",
    name: "open_rate",
    style: {
      width: "11%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Reply rate",
    name: "reply_rate",
    style: {
      width: "11%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
  {
    label: "Прогресс",
    name: "progress",
    style: {
      width: "15%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
  {
    label: "Отправлено",
    name: "delivered",
    style: {
      width: "10%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
];

const demo = [
  {
    id: 0,
    switch: true,
    title: "title1",
    people: 1,
    open_rate: 10,
    reply_rate: 0,
    progress: 10,
    delivered: 2,
  },
  {
    id: 1,
    switch: false,
    title: "title2",
    people: 2,
    open_rate: 0,
    reply_rate: 0,
    progress: 40,
    delivered: 1,
  },
  {
    id: 2,
    switch: true,
    title: "title3",
    people: 4,
    open_rate: 45,
    reply_rate: 10,
    progress: 23,
    delivered: 5,
  },
  {
    id: 3,
    switch: true,
    title: "title4",
    people: 2,
    open_rate: 0,
    reply_rate: 0,
    progress: 40,
    delivered: 1,
  },
];

const SequencesTable = ({ info, fetchData }) => {
  return (
    <>
      <div className="table-sequences-component h-100 overflow-auto mt-4">
        <Table
          className="align-items-center table-hover fixed-header"
          responsive
          style={{ tableLayout: "auto" }}
        >
          <thead
            className="sticky-top"
            style={{ zIndex: 999, boxShadow: "none" }}
          >
            <tr className="d-flex">
              {fields.map((field) => (
                <th
                  key={field.name + "1"}
                  style={{
                    ...field.style,
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    textTransform: "capitalize",
                  }}
                  className="pl-3"
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demo.map((sequence) => (
              <tr
                key={sequence.id}
                className="d-flex"
                // onClick={() => openModal(task)}
              >
                {fields.map((field) => {
                  if (field.name === "checkbox") {
                    return (
                      <td
                        className="d-flex align-items-center"
                        key={field.name}
                        style={{
                          ...field.style,
                        }}
                      >
                        <Checkbox
                          key={field.name}
                          id={sequence.id}
                          // checked={
                          //   selectedIds.includes(task.id) || isSelectedAll
                          // }
                          // onChange={() => onSelectTask(task.id)}
                        />
                      </td>
                    );
                  } else if (field.name === "switch") {
                    return (
                      <td
                        className="d-flex align-items-center"
                        key={field.name}
                        style={{
                          ...field.style,
                        }}
                      >
                        <label className="custom-toggle m-0">
                          <input
                            type="checkbox"
                            // checked={sequence[field.name]}
                            // onChange={() => !sequence[field.name]}
                          />
                          <span className="custom-toggle-slider rounded-circle" />
                        </label>
                      </td>
                    );
                  } else if (field.name === "progress") {
                    return (
                      <td
                        className="d-flex align-items-center"
                        key={field.name}
                        style={{
                          ...field.style,
                        }}
                      >
                        <Progress
                          max="100"
                          value={sequence[field.name]}
                          style={{
                            height: "8px",
                          }}
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
                          {sequence[field.name]}
                        </div>
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>

        {demo.length === 0 && <p className="message">Не найдено :(</p>}
      </div>
      {/* <CardFooter className="d-flex justify-content-between align-items-center">
        <div></div>
        <Pagination
          allCount={demo.length}
          countOnPage={COUNT_ON_PAGE}
          page={0}
          moveToPage={() => {}}
        />
      </CardFooter> */}
    </>
  );
};

export default SequencesTable;
