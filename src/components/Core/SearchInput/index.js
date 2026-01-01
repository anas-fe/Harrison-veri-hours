import { BiSearch } from "react-icons/bi";
import { Input } from "../Input";

function SearchInput({
  value,
  setter,
  placeholder = "Search",
  customStyle,
  inputStyle,
  onClick,
}) {
  return (
    <Input
      setter={setter}
      value={value}
      customStyle={{
        width: "320px",
        border: "none",
        borderRadius: "var(--btn-border-radius)",
        overflow: "hidden",

        ...customStyle,
      }}
      inputStyle={{
        fontSize: "var(--fs-base)",
        border: "var(--input-border)",
        borderRadius: "var(--input-border-radius)",
        ...inputStyle,
      }}
      placeholder={placeholder}
      rightIcon={
        <span
          style={{
            borderRadius: "50%",
          }}
          onClick={() => onClick && onClick()}
        >
          <BiSearch
            size={18}
            color={"#ccc"}
            style={{
              marginTop: "0px",
              marginRight: "0px",
              cursor: "pointer",
            }}
          />
        </span>
      }
      onEnter={onClick}
    />
  );
}

export default SearchInput;
