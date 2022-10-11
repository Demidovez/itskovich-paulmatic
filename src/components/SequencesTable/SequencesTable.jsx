import { Table, CardFooter } from "reactstrap";
import React, { useCallback, useEffect, useState } from "react";
import "./SequencesTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetSequencesQuery } from "store/api/sequences";
import { setSequencesToCache } from "store/slices/sequencesSlice";
import { setSequencesRequestStatus } from "store/slices/sequencesSlice";
import { addSequenceId } from "store/slices/sequencesSlice";
import { setCurrentSequencesPage } from "store/slices/sequencesSlice";
import Pagination from "components/Pagination/Pagination";
import SequencesTableItem from "components/SequencesTableItem/SequencesTableItem";

const COUNT_ON_PAGE = 100;

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
    name: "Stopped",
    style: {
      width: "6%",
      minWidth: "60px",
      maxWidth: "500px",
    },
  },
  {
    label: "Название",
    name: "Name",
    style: {
      width: "25%",
      minWidth: "240px",
      maxWidth: "500px",
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
    label: "Люди",
    name: "People",
    style: {
      width: "5%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Open rate",
    name: "Open_rate",
    style: {
      width: "9%",
      minWidth: "0px",
      maxWidth: "800px",
    },
  },
  {
    label: "Reply rate",
    name: "Reply_rate",
    style: {
      width: "9%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
  {
    label: "Прогресс",
    name: "Progress",
    style: {
      width: "10%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
  {
    label: "Model",
    name: "Model",
    style: {
      width: "6%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
  {
    label: "Process",
    name: "Process",
    style: {
      width: "6%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
  {
    label: "Отправлено",
    name: "Delivered",
    style: {
      width: "10%",
      minWidth: "0px",
      maxWidth: "400px",
    },
  },
];

const SequencesTable = ({ isSelectedAll, selectedIds }) => {
  const cached = useSelector((state) => state.sequences.cached);
  const currentPage = useSelector((state) => state.sequences.currentPage);

  const [getSequences, { data: sequencesData, isFetching }] =
    useLazyGetSequencesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sequencesData && !isFetching) {
      dispatch(setSequencesToCache(sequencesData));
    } else {
      dispatch(setSequencesRequestStatus(isFetching));
    }
  }, [isFetching, sequencesData]);

  const onSelectSequence = (id) => dispatch(addSequenceId(id));

  const fetchSequences = useCallback(() => {
    getSequences({
      params: { offset: currentPage * COUNT_ON_PAGE, count: COUNT_ON_PAGE },
    });
  }, [currentPage]);

  useEffect(() => {
    fetchSequences();

    // const intervalId = setInterval(() => {
    //   console.log("request of fetchSequences");
    //   fetchSequences();
    // }, 30000); // TODO1: 30000

    // return () => clearInterval(intervalId);
  }, [fetchSequences]);

  useEffect(() => {
    fetchSequences();
  }, [currentPage]);

  const onSetCurrentPage = (page) => {
    dispatch(setCurrentSequencesPage(page));
  };

  return (
    <>
      <div className="table-sequences-component h-100 overflow-auto mt-4">
        {((cached || sequencesData || {}).Items || []).length === 0 ? (
          <p className="message">
            У Вас пока нет последовательностей
            <br />
            Нажмите кнопку создать
          </p>
        ) : (
          <Table
            className="align-items-center table-hover fixed-header"
            responsive
            style={{ tableLayout: "auto" }}
          >
            <thead className="sticky-top" style={{ zIndex: 999 }}>
              <tr className="d-flex">
                {fields.map((field) => (
                  <th
                    key={field.name + "1"}
                    style={{
                      ...field.style,
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      textTransform: "capitalize",
                      boxShadow: "none",
                    }}
                    className={`${
                      field.name === "switch" ? "pl-3 pr-4" : "pl-3"
                    }`}
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {((cached || sequencesData || {}).Items || []).map((sequence) => (
                <SequencesTableItem
                  sequence={sequence}
                  fields={fields}
                  isSelect={selectedIds.includes(sequence.id) || isSelectedAll}
                  onSelect={() => onSelectSequence(sequence.id)}
                  key={sequence.id}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <CardFooter className="d-flex justify-content-between align-items-center">
        <div></div>
        <Pagination
          allCount={(sequencesData || cached).TotalCount}
          countOnPage={COUNT_ON_PAGE}
          page={currentPage}
          moveToPage={onSetCurrentPage}
        />
      </CardFooter>
    </>
  );
};

export default SequencesTable;
