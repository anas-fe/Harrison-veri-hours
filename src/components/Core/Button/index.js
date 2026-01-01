import PropTypes from "prop-types";
import classes from "./button.module.css";
import { cn } from "@/helper/HelperFunction";
import { forwardRef, isValidElement } from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

export const Button = forwardRef(
  (
    {
      parent,
      label,
      customStyle,
      secondaryButton,
      onClick,
      disabled,
      children,
      className,
      leftIcon,
      rightIcon,
      width,
      background,
      color,
      variant = "main",
      size = "md",
      type = "square",
      isHover,
      isSimpleHover = true,
      iconColor = "var(--white-color)",
      ...props
    },
    ref
  ) => {
    return (
      <>
        <button
          className={cn(
            classes.btn,
            secondaryButton && classes.secondaryBtn,
            isHover && classes.hover,
            isSimpleHover && classes.isSimpleHover,
            disabled && classes.disabled,
            className && className
          )}
          style={customStyle && customStyle}
          onClick={onClick}
          disabled={disabled ? disabled : false}
          data-variant={variant}
          data-type={type}
          data-size={size}
          {...props}
          ref={ref}
        >
          {leftIcon && isValidElement(leftIcon)
            ? leftIcon
            : leftIcon && (
                <BsArrowUpRightCircleFill color={iconColor} size={18} />
              )}
          {label && label}
          {children && children}
          {rightIcon && rightIcon}
        </button>
      </>
    );
  }
);

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
  customStyle: {},
};
