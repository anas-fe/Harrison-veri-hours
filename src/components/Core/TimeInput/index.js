import { setHours, setMinutes } from "date-fns";
import moment from "moment";
import { useRef, useState } from "react";
import { LuClock } from "react-icons/lu";
import { Label } from "../Label";
import PopperComponent from "../PopperComponent";
import "../Styles/styles.css"
import classes from "./TimeInput.module.css";
import { FaRegCalendar } from "react-icons/fa6";
import { cn } from "@/helper/HelperFunction";
import { toast } from "react-toastify";

export default function TimeInput({
  label,
  value,
  setValue,
  placeholder = "Select",
  variant = "primary",
  size = "md",
  inline,
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const generateItems = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleSelectHour = (hour) => {
    setValue(setHours(value ? value : new Date(), hour));
  };

  const handleSelectMinute = (minute) => {
    setValue(setMinutes(value ? value : new Date(), minute));
  };

  const handleSelectAMPM = (ampm) => {
    if (!value) {
      toast.error("Please select a time first");
      return;
    }
    const hours = value.getHours();
    if (ampm === "PM" && hours < 12) {
      setValue(setHours(value, hours + 12));
    } else if (ampm === "AM" && hours >= 12) {
      setValue(setHours(value, hours - 12));
    }
  };

  const renderPicker = (items, onSelectItem, selectedValue) => {
    return (
      <div>
        <div className={classes.scrollPicker}>
          {items.map((item) => (
            <span
              key={item}
              onClick={() => onSelectItem(item)}
              className={cn(classes.pickerItem, {
                [classes.active]: item === selectedValue,
              })}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn(classes.timeInput, inline && classes.inline)}>
      <Label variant={inline && "inline"}>{label}</Label>
      <PopperComponent
        open={open}
        setOpen={setOpen}
        popperInsideElement={
          <div className={classes.DayPickerInput}>
            {renderPicker(
              generateItems(1, 12),
              handleSelectHour,
              value ? value.getHours() % 12 || 12 : null,
            )}
            {renderPicker(
              generateItems(0, 59),
              handleSelectMinute,
              value ? value.getMinutes() : null,
            )}
            {renderPicker(
              ["AM", "PM"],
              handleSelectAMPM,
              value ? (value.getHours() >= 12 ? "PM" : "AM") : null,
            )}
          </div>
        }
        anchorRef={ref}
      >
        <div
          className={classes.input__wrapper}
          onClick={() => setOpen(true)}
          ref={ref}
        >
          <input
            readOnly
            className={classes.input}
            value={value ? moment(value).format("hh:mm A") : ""}
            placeholder={placeholder}
            data-variant={variant}
            data-size={size}
          />
          <FaRegCalendar
            size={18}
            color="var(--icon-color)"
            className={classes.icon}
          />
        </div>
      </PopperComponent>
    </div>
  );
}
