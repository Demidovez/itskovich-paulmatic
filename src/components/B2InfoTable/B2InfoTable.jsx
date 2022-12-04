import { CardFooter, Table, Label } from "reactstrap";
import Pagination from "../Pagination/Pagination";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HiddenTableCell from "components/HiddenTableCell/HiddenTableCell";
import { setCurrentPage } from "store/slices/b2bFilterSlice";
import { clearSelectedIds } from "store/slices/tablesSlice";
import { setCache, addSelectedId } from "store/slices/tablesSlice";
import "./B2InfoTable.scss";
import { setLoaderStatus } from "store/slices/commonSlice";

const COUNT_ON_PAGE = 100;

const B2InfoTable = ({
  info,
  data,
  fetchData,
  fields = [],
  isLoading = true,
  isLoaded = true,
  loadingLabel,
}) => {
  const filterState = useSelector((state) => state.filter[info.name]);
  const currentPage = useSelector(
    (state) => state.filter.currentPage[info.name] || 0
  );
  const filterStatus = useSelector((state) => state.filter.status[info.name]);
  const searchValue = useSelector((state) => state.filter.search[info.name]);
  const selectedIds = useSelector(
    (state) => state.tables.selectedIds[info.name] || []
  );
  const cacheTables = useSelector((state) => state.tables.cache);
  const dispatch = useDispatch();

  useEffect(() => {
    if (["reset", "event"].includes(filterStatus)) {
      onSetCurrentPage(0);
      fetchData({
        ...filterState,
        offset: 0,
        count: COUNT_ON_PAGE,
        name: searchValue,
      });
      dispatch(clearSelectedIds(info.name));
    }
  }, [JSON.stringify(filterState), searchValue, filterStatus]);

  const onSetCurrentPage = (page) => {
    dispatch(setCurrentPage({ filter: info.name, page }));
  };

  useEffect(() => {
    fetchData({
      ...filterState,
      offset: currentPage * COUNT_ON_PAGE,
      count: COUNT_ON_PAGE,
      name: searchValue,
    });
  }, [currentPage]);

  useEffect(() => {
    data && dispatch(setCache({ table: info.name, data }));
  }, [data]);

  const onSelectId = (id) => {
    dispatch(addSelectedId({ table: info.name, id }));
  };

  useEffect(() => {
    !isLoaded &&
      dispatch(
        setLoaderStatus({
          page: "b2b",
          part: loadingLabel,
          value: !!data,
        })
      );
  }, [data, isLoaded]);

  return (
    <>
      <div
        className="b2-info-table-component h-100 overflow-auto"
        style={{ display: isLoading ? "none" : "block" }}
      >
        {((data || cacheTables[info.name] || {}).Items || []).length === 0 ? (
          <p className="message" style={{ display: data ? "block" : "none" }}>
            По вашему запросу результаты не найдены
          </p>
        ) : (
          <Table
            className="align-items-center table-hover fixed-header"
            responsive
            style={{ tableLayout: "auto" }}
          >
            <thead className="thead-light sticky-top" style={{ zIndex: 999 }}>
              <tr className="d-flex">
                {fields.map((field) => (
                  <th key={field.name + "1"} style={field.style}>
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {((data || cacheTables[info.name] || {}).Items || []).map(
                (company) => (
                  <tr key={company.Id || company.id} className="d-flex">
                    {fields.map((field) => {
                      if (field.name === "checkbox") {
                        return (
                          <td
                            className="p-0 pt-3"
                            key={field.name}
                            style={{
                              whiteSpace: "normal",
                              ...field.style,
                            }}
                          >
                            <div className="custom-control checkbox-contact custom-checkbox pl-0">
                              <input
                                className="custom-control-input"
                                checked={selectedIds.includes(
                                  company.Id || company.id
                                )}
                                onChange={() =>
                                  onSelectId(company.Id || company.id)
                                }
                                id={"check_" + (company.Id || company.id)}
                                type="checkbox"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor={"check_" + (company.Id || company.id)}
                              ></Label>
                            </div>
                          </td>
                        );
                      } else if (
                        field.name === "Socials" ||
                        field.name === "Website"
                      ) {
                        return (
                          <td
                            key={field.name}
                            style={{
                              whiteSpace: "normal",
                              ...field.style,
                            }}
                          >
                            {company[field.name]
                              .trim()
                              .split(",")
                              .map((socialItem, index) => (
                                <small key={index}>
                                  <p
                                    className={"ellipsized"}
                                    style={{
                                      fontSize: "small",
                                      marginBottom: 0,
                                    }}
                                  >
                                    <a href={socialItem.trim()} target="_blank">
                                      {socialItem.trim()}
                                    </a>
                                  </p>
                                </small>
                              ))}
                          </td>
                        );
                      } else if (field.name === "Linkedin") {
                        return (
                          <td
                            key={field.name}
                            style={{
                              whiteSpace: "normal",
                              ...field.style,
                            }}
                          >
                            <a href={company[field.name]} target="_blank">
                              {company[field.name]}
                            </a>
                          </td>
                        );
                      } else if (["Email"].includes(field.name)) {
                        return (
                          <HiddenTableCell
                            key={field.name}
                            value={company[field.name]}
                            style={field.style}
                          />
                        );
                      } else if (["Phone"].includes(field.name)) {
                        return (
                          <HiddenTableCell
                            key={field.name}
                            value={
                              company[field.name] &&
                              company[field.name]
                                .trim()
                                .split(";")
                                .map((phone, index) => (
                                  <div key={index}>{phone.trim()}</div>
                                ))
                            }
                            style={field.style}
                          />
                        );
                      } else if (["Company"].includes(field.name)) {
                        return (
                          <td
                            key={field.name}
                            style={{
                              whiteSpace: "normal",
                              ...field.style,
                            }}
                          >
                            {company[field.name]}
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={field.name}
                            style={{
                              whiteSpace: "normal",
                              ...field.style,
                            }}
                          >
                            {company[field.name]}
                          </td>
                        );
                      }
                    })}
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
      </div>
      <CardFooter
        className={`${
          isLoading ? "d-none" : "d-flex"
        } justify-content-between align-items-center`}
      >
        <div></div>
        <Pagination
          allCount={(data || cacheTables[info.name] || {}).TotalCount || 0}
          countOnPage={COUNT_ON_PAGE}
          page={currentPage}
          moveToPage={onSetCurrentPage}
        />
      </CardFooter>
    </>
  );
};

export default React.memo(B2InfoTable);
