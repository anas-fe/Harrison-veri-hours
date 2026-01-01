"use client";
import { cn, formatDate } from "@/helper/HelperFunction";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import classNames from "react-day-picker/style.css";
import { CgCalendarDates } from "react-icons/cg";
import { Input } from "../Input";
import { Label } from "../Label";
import PopperComponent from "../PopperComponent";
import classes from "./DateInput.module.css";

export default function DateInput({
  value,
  setValue,
  label,
  placeholder,
  minDate,
  maxDate,
  error,
  errorText,
  parentStyles,
  inputStyle,
  mode = "single",
  id = "",
  variant = "primary",
  customClass,
  inline,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  return (
    <div
      className={cn(
        classes.dateInput,
        customClass,
        mode === "range" && classes.range,
        inline && classes.inline
      )}
      style={parentStyles}
      ref={ref}
      id={id}
    >
      {label && <Label variant={inline && "inline"}>{label}</Label>}
      <PopperComponent
        open={open}
        setOpen={setOpen}
        anchorRef={ref}
        popperInsideElement={
          <div className={cn(classes.DayPickerInput, customClass)}>
            <DayPicker
              classNames={classNames}
              mode={mode}
              selected={value}
              onSelect={(e) => {
                setValue(e);
                setOpen(false);
              }}
              footer={null}
              disabled={{
                ...(maxDate && { after: new Date(maxDate) }),
                ...(minDate && { before: new Date(minDate) }),
              }}
            />
          </div>
        }
      >
        <Input
          placeholder={placeholder}
          value={
            value
              ? mode === "range"
                ? `${value?.from ? formatDate(value?.from) : ""} - ${
                    value?.to ? formatDate(value?.to) : ""
                  }`
                : formatDate(value)
              : ""
          }
          setter={() => {}}
          error={error}
          errorText={errorText}
          rightIcon={
            <CgCalendarDates
              size={22}
              color="var(--icon-color)"
              style={{ marginTop: "-5px" }}
            />
          }
          inputStyle={inputStyle}
          customStyle={{ width: "100%", ...parentStyles }}
          {...props}
          variant={variant !== "inline" ? variant : false}
        />
      </PopperComponent>
    </div>
  );
}
