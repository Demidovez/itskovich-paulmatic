import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Input, Button, Form } from "reactstrap";
import { useLazyGetCompaniesQuery } from "store/api/companies";
import FilterType from "../FilterType/FilterType";

const FilterCompanies = ({
  filters,
  style,
  className,
  onSelectFilter,
  requestParams,
}) => {
  return (
    <Card className={`${className} shadow`} color="secondary" style={style}>
      <CardHeader className="border-0">
        <h3 className="mb-0">Фильтр</h3>
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
