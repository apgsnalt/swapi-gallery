import { extractNumber } from "../../helpers/utils";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
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

export default SelectField;