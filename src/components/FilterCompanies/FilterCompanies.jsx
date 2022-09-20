import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Input, Button, Form } from "reactstrap";
import { useLazyGetCompaniesQuery } from "store/api/companies";
import FilterType from "../FilterType/FilterType";
import "./FilterCompanies.scss";

const FilterCompanies = ({
  filters,
  style,
  className,
  onSelectFilter,
  requestParams,
}) => {
  return (
    <Card
      className={`${className} shadow filter-companies`}
      color="secondary"
      style={style}
    >
      <CardHeader className="border-0 d-flex justify-content-between">
        <h3 className="mb-0">Фильтр</h3>
        <div className="filter-reset">очистить</div>
      </CardHeader>
      <CardBody>
        <Form>
          {[...filters]
            .sort((a, b) => a.Index - b.Index)
            .map((filter) => (
              <FilterType
                data={filter}
                key={filter.Index}
                onChange={onSelectFilter}
                isDisabled={
                  filter.DependsOnFilter === ""
                    ? false
                    : !requestParams[filter.DependsOnFilter]
                }
              />
            ))}
        </Form>
      </CardBody>
    </Card>
  );
};

export default FilterCompanies;
