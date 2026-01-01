import { cn } from "@/helper/HelperFunction";
import DateInput from "../DateInput";
import classes from "./HeadingComponent.module.css";

export default function HeadingComponent({
  heading,
  year,
  setYear,
  showYear = true,
  mode = "single",
  maxDate,
  minDate,
  className,
}) {
  return (
    <div
      className={cn(
        classes.heading_container,
        !showYear && classes.heading_container__noYear,
        className
      )}
    >
      <h2>{heading}</h2>
      {showYear && setYear && (
        <DateInput
          value={year}
          setValue={setYear}
          placeholder="Select Year"
          inputStyle={{
            backgroundColor: "var(--white-color)",
            border: "none",
            color: "var(--tertiary-text-color)",
            padding: "0.7rem",
          }}
          mode={mode}
          maxDate={maxDate}
          minDate={minDate}
        />
      )}
    </div>
  );
}
