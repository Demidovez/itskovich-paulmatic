import { FormGroup, Label } from 'reactstrap';

import Selector from '~src/components/Selector/Selector';

import './FilterType.scss';

const FilterType = ({ data, value, onChange, isDisabled, dependValue }) => {
  switch (data.Type) {
    case 'choice':
      return (
        <FormGroup>
          <p className="mb-1">
            <strong>{data.Description}</strong>
          </p>
          <div className="mb-3">
            <Selector
              data={data}
              dependValue={dependValue}
              value={value}
              onSelect={(value) => onChange(data.Name, value)}
              isDisabled={isDisabled}
            />
          </div>
        </FormGroup>
      );
    case 'flag':
      return (
        <FormGroup className="mb-2 filter-type">
          <div className="custom-control custom-checkbox mb-3">
            <input
              className="custom-control-input"
              checked={!!value}
              onChange={(e) => onChange(data.Name, e.target.checked)}
              id={data.Name + '_check'}
              type="checkbox"
            />
            <Label
              className="custom-control-label"
              htmlFor={data.Name + '_check'}
            >
              {data.Description}
            </Label>
          </div>
        </FormGroup>
      );
    default:
      return null;
  }
};

export default FilterType;
