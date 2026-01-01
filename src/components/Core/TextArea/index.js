import { cn } from "@/helper/HelperFunction";
import { Label } from "../Label";
import classes from "./TextArea.module.css";
import PropTypes from "prop-types";

export function TextArea({
  value,
  setter,
  label,
  placeholder,
  customStyle,
  labelStyle,
  rows = 5,
  className,
  disabled,
  error,
  errorText,
  containerClass,
  variant = "primary",
  labelOnTop,
  id = "",
  inline,
}) {
  return (
    <div
      className={cn(
        classes.textAreaBox,
        containerClass && containerClass,
        labelOnTop && classes.labelOnTop,
        value && classes.hasValue,
        variant === "secondary" && classes.secondary,
        inline && classes.inline
      )}
    >
      {label && (
        <Label
          disabled={disabled}
          labelOnTop={labelOnTop}
          style={{ ...labelStyle }}
          variant={inline && "inline"}
        >
          {label}
        </Label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        style={{
          ...customStyle,
          border: error ? "1px solid red" : "none",
        }}
        onChange={(e) => {
          setter(e.target.value);
        }}
        onBlur={() => {
          setter(value?.trim());
        }}
        className={className}
        rows={rows}
        disabled={disabled}
        id={id}
      />
      {error && <p className={classes.errorText}>{errorText}</p>}
    </div>
  );
}
TextArea.propTypes = {
  value: PropTypes.string,
  setter: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};
