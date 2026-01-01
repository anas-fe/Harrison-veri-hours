import { Label } from "../Label";
import classes from "./Radio.module.css";
import PropTypes from "prop-types";

export const Radio = ({ value, setValue, label, labelStyles, disabled }) => {
  return (
    <div className={`my-2 ${classes.radioWithLabel}`}>
      <input
        type="radio"
        id={`radio${label}`}
        checked={value === label && "checked"}
        disabled={disabled}
        onChange={(e) => {
          setValue(label);
        }}
        className={`${[classes.radioInput].join(" ")}`}
      />
      {label && (
        <Label
          htmlFor={`radio${label}`}
          style={{ ...labelStyles, marginBottom: "0px" }}
        >
          {label}
        </Label>
      )}
    </div>
  );
};

Radio.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
Radio.defaultProps = {
  value: false,
  disabled: false,
  label: null,
};
