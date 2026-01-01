import { Label } from "../Label";
import classes from "./Checkbox.module.css";
import PropTypes from "prop-types";

export const Checkbox = ({
  value,
  setValue,
  label,
  disabled,
  labelStyle,
  error,
  errorText,
  id = "",
}) => {
  const checkValueTypeArray = Array.isArray(value);
  const isChecked = checkValueTypeArray
    ? value?.findIndex((findValue) => findValue == label)
    : value == label
    ? true
    : false;

  const HandleClick = () => {
    let newArray = [];
    if (checkValueTypeArray) {
      newArray = value?.slice();
      if (isChecked !== -1) {
        newArray.splice(isChecked, 1);
      } else {
        newArray.push(label);
      }
    } else {
      newArray = isChecked ? "" : label;
    }
    setValue(newArray);
  };
  return (
    <>
      <style>{`
        .${classes.container} input:disabled ~ .${classes.checkmark} {
          border: ${
            checkValueTypeArray && isChecked !== -1
              ? 0
              : checkValueTypeArray == false && isChecked == true
              ? 0
              : 2
          }px
            solid var(--text-color);
          background-color: ${
            checkValueTypeArray && isChecked !== -1
              ? "var(--main-color)"
              : checkValueTypeArray == false && isChecked == true
              ? "var(--main-color)"
              : "transparent"
          };
        }
      `}</style>

      <div className={`my-2 ${classes.checkboxWithLabel}`}>
        <div className={`${classes.container}`}>
          <input
            type="checkbox"
            checked={
              checkValueTypeArray && isChecked !== -1
                ? "checked"
                : checkValueTypeArray == false && isChecked == true && "checked"
            }
            disabled={disabled}
            id={id}
          />
          <span
            className={classes.checkmark}
            onClick={() => disabled !== true && HandleClick()}
          ></span>
        </div>
        {label && (
          <Label
            htmlFor={id || `checkbox${label}`}
            disabled={disabled}
            style={{
              ...labelStyle,
            }}
          >
            <span>{label}</span>
          </Label>
        )}
        {error && <p className={classes.errorText}>({errorText})</p>}
      </div>
    </>
  );
};

Checkbox.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
};
Checkbox.defaultProps = {
  value: [],
  disabled: false,
  label: null,
};
