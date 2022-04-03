/**
 * Generic component for the year field (numeric type)
 */

import PropTypes from 'prop-types';


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

YearField.propTypes = {
  // Name used for the component and the label
  name: PropTypes.string.isRequired,
  // Current value for the field
  value: PropTypes.string.isRequired,
  // Callback triggered on field change
  onChange: PropTypes.func.isRequired,
};


export default YearField;
