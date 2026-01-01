"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import "../Styles/styles.css";
import classes from "./input.module.css";
import { numberRegEx } from "@/data/regex";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Label } from "../Label";
import { cn } from "@/helper/HelperFunction";

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  type,
  label,
  label2, // sub label
  value, // input value
  setter, //setValue
  noBorder,
  placeholder,
  disabled,
  parentCustomStyle, //Main Div Inline Style
  customStyle, //Input Container inline Style
  inputStyle, //Input inline Style
  labelStyle, //Label inline Style
  error, // Show Error Boolean
  errorText, // Error Text
  leftIcon, // Icon For Input
  rightIcon,
  regexType,
  labelOnTop = false,
  onEnter,
  variant = "primary",
  size = "md",
  customContainerClass,
  ref,
  id,
  inline,
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);
  let inputContainerStyleObject = Object.assign(
    {},
    error && { border: `1px solid red ` },
    leftIcon && { paddingLeft: "50px" }
  );
  return (
    <>
      <div
        className={cn(
          classes.Container,
          labelOnTop && classes.labelOnTop,
          value && classes.hasValue,
          inline && classes.inline
        )}
        style={{ ...parentCustomStyle }}
      >
        {label && (
          <Label
            htmlFor={`input${label}`}
            disabled={disabled}
            labelOnTop={labelOnTop}
            style={{ ...labelStyle }}
            variant={inline && "inline"}
          >
            {label} {label2 && label2}
          </Label>
        )}
        <div
          className={cn(
            classes.inputPassContainer,
            customContainerClass && customContainerClass
          )}
          style={{ ...customStyle }}
        >
          {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}

          {type === "range" && (
            <div
              className={classes.rangeValue}
              style={{
                margin: "0.5rem",
                textAlign: "right",
                fontWeight: 500,
              }}
            >
              ${value}
            </div>
          )}
          <input
            value={value}
            onKeyDown={(e) => {
              if (onEnter) {
                if (value === "") return;
                if (e.key == "Enter") {
                  onEnter();
                }
              }
            }}
            ref={ref}
            onChange={(e) => {
              if (regexType == "number" || type == "number") {
                setter(e?.target?.value?.replace(numberRegEx, ""));
              } else {
                setter(e.target.value);
              }
            }}
            disabled={disabled}
            placeholder={!labelOnTop && placeholder}
            type={passToggle == true ? "text" : type}
            id={id}
            data-variant={variant}
            data-size={size}
            className={cn(
              classes.inputBox,
              noBorder && classes.noBorder,
              labelOnTop && classes.labelOnTop__input
            )}
            style={{ ...inputContainerStyleObject, ...inputStyle }}
            onBlur={(e) => {
              setter(e.target.value?.trim());
            }}
            {...props}
          />
          {rightIcon && <div className={classes.rightIcon}>{rightIcon}</div>}

          {type == "password" && passToggle == false && (
            <FaRegEyeSlash
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
          {type == "password" && passToggle && (
            <FaRegEye
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
        </div>
        {error && (
          <p
            className={cn(
              classes.errorText,
              type == "password" || rightIcon
                ? classes.offsetLeftError
                : undefined
            )}
          >
            {errorText}
          </p>
        )}
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setter: PropTypes.string,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  label2: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "Enter text",
  value: "",
  noBorder: false,
  disabled: false,
  error: false,
  errorText: "An error has occurred, check your details!",
};
