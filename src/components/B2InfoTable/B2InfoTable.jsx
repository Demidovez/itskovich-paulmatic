import { Card, CardHeader, CardFooter, Spinner } from "reactstrap";
import TableCompanies from "../TableCompanies/TableCompanies";
import FilterCompanies from "../FilterCompanies/FilterCompanies";
import SearchContacts from "../SearchContacts/SearchContacts";
import { useLazyGetCompaniesQuery } from "../../store/api/companies";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useState } from "react";

const B2InfoTable = ({ info, data = [], isLoading, fetchData }) => {
  const [requestParams, setRequestParams] = useState({});

  const addRequestParams = (param, value) => {
    setRequestParams((prev) => ({ ...prev, [param]: value }));
  };

  useEffect(() => {
    fetchData(requestParams);
  }, [requestParams]);

  useEffect(() => {
    console.log("mount");
  }, []);

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
              <TableCompanies data={data} />
              <CardFooter>
                <Pagination />
              </CardFooter>
            </Card>
          </div>
          <div className="col col-3">
            <FilterCompanies
              filters={info.filters.map((filter) =>
                filter.Name === "country"
                  ? { ...filter, Variants: ["Россия"] }
                  : filter.Name === "region"
                  ? {
                      ...filter,
                      Variants: [
                        "country=Россия;Абакан",
                        "country=Россия;Архангельск",
                        "country=Россия;Астрахань",
                        "country=Россия;Барнаул",
                      ],
                    }
                  : filter
              )}
              className="sticky-top"
              style={{ top: 20 }}
              onSelectFilter={addRequestParams}
              requestParams={requestParams}
            />
          </div>
        </>
      )}
    </>
  );
};

export default B2InfoTable;
