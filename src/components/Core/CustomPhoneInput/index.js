import { cn } from "@/helper/HelperFunction";
import PhoneInput from "react-phone-number-input";
import { Label } from "../Label";
import "../Styles/styles.css";
import classes from "./CustomPhoneInput.module.css";

const PhoneNumberInput = ({
  label,
  value,
  setter,
  disabled,
  error = false,
  placeholder = "Phone Number",
  defaultCountry = "",
  containerClass,
  phoneInputClass,
  errorText,
  size = "md",
  variant = "primary",
  inline,
}) => {
  return (
    <div
      className={cn(
        classes.phoneNumberDiv,
        containerClass && containerClass,
        inline && classes.inline
      )}
    >
      {label && <Label variant={inline ? "inline" : ""}>{label}</Label>}
      <div
        className={cn(
          classes.phoneInputContainer,
          phoneInputClass && phoneInputClass
        )}
      >
        <PhoneInput
          placeholder={placeholder}
          value={value}
          onChange={setter}
          disabled={disabled}
          className={cn(classes.phoneNumberInput, error && classes.error)}
          defaultCountry={defaultCountry}
          international
          countryCallingCodeEditable={false}
          data-size={size}
          data-variant={variant}
        />
      </div>
      {error && <p className={cn(classes.errorText)}>{errorText}</p>}
    </div>
  );
};

export default PhoneNumberInput;
