/**
 * 
 * @param {*} param0 
 * @returns 
 */

const YearField = ({
  name,
  value,
  onChange,
}) => (
  <label htmlFor={name}>
    <span>{name}</span>
    <input
      type="number"
      id={name}
      name={name}
      onChange={onChange}
      defaultValue={value}
    />
</label>
);

export default YearField;
