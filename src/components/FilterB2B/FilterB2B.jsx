import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Input, Button, Form } from "reactstrap";
import { useLazyGetCompaniesQuery } from "store/api/companies";
import { resetFilter } from "store/slices/b2bFilterSlice";
import { addFilterItem } from "store/slices/b2bFilterSlice";
import { getValueOfObjectByField } from "utils/utils";
import FilterType from "../FilterType/FilterType";
import "./FilterB2B.scss";

const FilterB2B = ({ name, filterState, filters, style, className }) => {
  const dispatch = useDispatch();

  const onSelectFilter = (item, value) => {
    dispatch(addFilterItem({ filter: name, item, value }));
  };

  const onResetFilter = () => {
    dispatch(resetFilter(name));
  };

  return (
    <Card
      className={`${className} shadow filter-b2b`}
      color="secondary"
      style={style}
    >
      <CardHeader className="border-0 d-flex justify-content-between">
        <h3 className="mb-0">Фильтр</h3>
        {filterState && Object.keys(filterState).length ? (
          <div className="filter-reset" onClick={onResetFilter}>
            очистить
          </div>
        ) : null}
      </CardHeader>
      <CardBody>
        <Form>
          {[...filters]
            .sort((a, b) => a.Index - b.Index)
            .map((filter) => (
              <FilterType
                data={filter}
                value={getValueOfObjectByField(filterState, filter.Name)}
                key={filter.Index}
                onChange={onSelectFilter}
                // isDisabled={
                //   filter.DependsOnFilter === ""
                //     ? false
                //     : !requestParams[filter.DependsOnFilter]
                // }
              />
            ))}
        </Form>
      </CardBody>
    </Card>
  );
};

export default FilterB2B;
