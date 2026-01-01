import { camelCaseToLower, RenderToast } from "./HelperFunction";

export const validateTerminal = (terminals) => {
  for (let i = 0; i < terminals.length; i++) {
    const terminal = terminals[i];
    for (let key in terminal) {
      if (terminal[key]?.trim() === "") {
        RenderToast({
          type: "error",
          message: `${camelCaseToLower(key)} at terminal ${
            i + 1
          } is required field!`,
        });
        return false;
      }
    }
  }
  return true;
};
