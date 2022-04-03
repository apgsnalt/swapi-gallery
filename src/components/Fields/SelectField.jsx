/**
 * Generic component for select field
 */

import PropTypes from 'prop-types';

import { extractNumber } from "../../helpers/utils";


const SelectField = ({
  name,
  value,
  onChange,
  list,
}) => (
  <label htmlFor={name}>
    Filter by {name}
    <br />
    <select
      name={`filter-${name}`}
      id={`filter-${name}`}
      onChange={onChange}
      value={value}
    >
      <option
        key={`filter-${name}-0`}
        value="" 
      >
        All
      </option>
      {list.map((el) => (
        <option
          key={`filters-${name}-${extractNumber(el.url)}`}
          value={el.url}
        >
          {el.title ?? el.name}
        </option>
      ))}
    </select>
  </label>
);

SelectField.propTypes = {
  // Name used for the component and the label
  name: PropTypes.string.isRequired,
  // Current value for the field
  value: PropTypes.string.isRequired,
  // Callback triggered on field change
  onChange: PropTypes.func.isRequired,
  // List of options
  list: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default SelectField;