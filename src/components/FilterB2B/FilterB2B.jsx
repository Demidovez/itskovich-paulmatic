import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Form } from "reactstrap";
import { resetFilter } from "store/slices/b2bFilterSlice";
import { addFilterItem } from "store/slices/b2bFilterSlice";
import { getValueOfObjectByField } from "utils/utils";
import FilterType from "../FilterType/FilterType";
import "./FilterB2B.scss";

const FilterB2B = ({ name, filters, style, className }) => {
  // console.log(name, filters);

  const filterState = useSelector((state) => state.filter[name]);

  const dispatch = useDispatch();

  const onSelectFilter = (item, value, dependValue) => {
    console.log(name, item, value, dependValue);
    dispatch(addFilterItem({ filter: name, item, value, dependValue }));
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
            <i className="fas fa-solid"></i>
            <span>сбросить</span>
          </div>
        ) : null}
      </CardHeader>
      <CardBody>
        <Form>
          {filterState &&
            [...filters]
              .sort((a, b) => a.Index - b.Index)
              .map((filter) => (
                <FilterType
                  data={filter}
                  dependValue={filterState[filter.DependsOnFilter]}
                  value={getValueOfObjectByField(filterState, filter.Name)}
                  key={filter.Name}
                  onChange={(...args) =>
                    onSelectFilter(
                      ...args,
                      (
                        filters.find(
                          (f) => f.DependsOnFilter === filter.Name
                        ) || {}
                      ).Name
                    )
                  }
                  isDisabled={
                    filter.DependsOnFilter === ""
                      ? false
                      : !filterState[filter.DependsOnFilter]
                  }
                />
              ))}
        </Form>
      </CardBody>
    </Card>
  );
};

export default FilterB2B;
