import { Card, CardHeader, CardFooter, Spinner, Row, Col } from "reactstrap";
import TableInfo from "../TableInfo/TableInfo";
import FilterB2B from "../FilterB2B/FilterB2B";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFilter } from "store/slices/b2bFilterSlice";
import { setCurrentPage } from "store/slices/b2bFilterSlice";
import { setSearchValue } from "store/slices/b2bFilterSlice";
import ActionTableBar from "components/ActionTableBar/ActionTableBar";
import { clearSelectedIds } from "store/slices/tablesSlice";

const COUNT_ON_PAGE = 100;

const B2InfoTable = ({ info, data, isLoading, fetchData, fields = [] }) => {
  const filterState = useSelector((state) => state.filter[info.name]);
  const currentPage = useSelector(
    (state) => state.filter.currentPage[info.name] || 0
  );
  const filterStatus = useSelector((state) => state.filter.status[info.name]);
  const searchValue = useSelector((state) => state.filter.search[info.name]);
  const selectedIds = useSelector(
    (state) => state.tables.selectedIds[info.name] || []
  );
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

  useEffect(() => {
    dispatch(checkFilter({ filter: info.name }));
  }, []);

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

  const onSearchItems = (searchStr) => {
    dispatch(setSearchValue({ filter: info.name, search: searchStr }));
  };

  const onAddContact = () => {};

  const onAddToSequence = () => {};

  return (
    <>
      {isLoading ? (
        <div className="container d-flex justify-content-center">
          {/*<Spinner color="primary" className="m-5 " />*/}
        </div>
      ) : (
        <>
          <div className="col col-9 mb-3 d-flex">
            <Card className="shadow flex-fill overflow-hidden">
              <CardHeader className="border-0">
                <Row>
                  <Col md={6}></Col>
                  <Col md={6} className="d-flex">
                    <ActionTableBar
                      disabled={selectedIds.length === 0}
                      onAddContact={onAddContact}
                      onAddToSequence={onAddToSequence}
                    />
                    <SearchBar
                      onSearch={onSearchItems}
                      search={searchValue}
                      className="flex-fill"
                    />
                  </Col>
                </Row>
              </CardHeader>
              <TableInfo
                data={data ? data.Items : []}
                fields={fields}
                table={info.name}
                selectedIds={selectedIds}
              />
              <CardFooter className="d-flex justify-content-between align-items-center">
                <div></div>
                <Pagination
                  allCount={data ? data.TotalCount : 0}
                  countOnPage={COUNT_ON_PAGE}
                  page={currentPage}
                  moveToPage={onSetCurrentPage}
                />
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
