import { Card, CardHeader, Container, Row, Col, Spinner } from "reactstrap";
import TableCompanies from "../TableCompanies/TableCompanies";
import FilterCompanies from "../FilterCompanies/FilterCompanies";
import SearchContacts from "../SearchContacts/SearchContacts";
import { useLazyGetCompaniesQuery } from "../../store/api/companies";
import React, { useEffect, useState } from "react";

const B2Companies = ({ info }) => {
  const [fetchCompanies, { data: companies, isFetching, isLoading }] =
    useLazyGetCompaniesQuery();

  const [requestParams, setRequestParams] = useState({});

  const addRequestParams = (param, value) => {
    setRequestParams((prev) => ({ ...prev, [param]: value }));
  };

  useEffect(() => {
    console.log(requestParams);
    fetchCompanies(requestParams);
  }, [requestParams]);

  return (
    <>
      {isLoading ? (
        <div className="container d-flex justify-content-center">
          <Spinner color="primary" className="m-5 " />
        </div>
      ) : (
        <>
          <div className="col col-9 mb-5">
            <Card className="shadow">
              <CardHeader className="border-0 ">
                <Row>
                  <Col md={6}>
                    Найдено: <strong>{(companies || []).length}</strong>
                  </Col>
                  <Col md={6} className="d-flex justify-content-end"></Col>
                </Row>
              </CardHeader>
              <TableCompanies
                data={companies}
                onSelect={() => {}}
                activeContactId={-1}
              />
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

export default B2Companies;
