import { Card, CardHeader, CardFooter, Spinner } from "reactstrap";
import TableCompanies from "../TableCompanies/TableCompanies";
import FilterB2B from "../FilterB2B/FilterB2B";
import SearchContacts from "../SearchContacts/SearchContacts";
import { useLazyGetCompaniesQuery } from "../../store/api/companies";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFilter } from "store/slices/b2bFilterSlice";

const B2InfoTable = ({
  info,
  data = [],
  isLoading,
  fetchData,
  fields = [],
}) => {
  const filterState = useSelector((state) => state.filter[info.name]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkFilter(info.name));
  }, []);

  useEffect(() => {
    fetchData(filterState);
  }, [JSON.stringify(filterState)]);

  return (
    <>
      {isLoading ? (
        <div className="container d-flex justify-content-center">
          <Spinner color="primary" className="m-5 " />
        </div>
      ) : (
        <>
          <div className="col col-9 mb-3 d-flex">
            <Card className="shadow flex-fill overflow-hidden">
              <CardHeader className="border-0">
                <h5 className="mb-0">Найдено: {data.length}</h5>
              </CardHeader>
              <TableCompanies data={data} fields={fields} />
              <CardFooter>
                <Pagination />
              </CardFooter>
            </Card>
          </div>
          <div className="col col-3">
            <FilterB2B
              name={info.name}
              filterState={filterState}
              filters={info.filters}
              className="sticky-top"
              style={{ top: 20 }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default B2InfoTable;
