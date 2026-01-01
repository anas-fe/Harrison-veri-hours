import React from "react";
import classes from "./Box.module.css";

export default function Box({
  className,
  children,
  variant = "primary",
  style,
  overflow,
}) {
  return (
    <div
      className={[classes.container, className && className].join(" ")}
      data-variant={variant}
      data-overflow={overflow}
      style={style}
    >
      {children}
    </div>
  );
}
