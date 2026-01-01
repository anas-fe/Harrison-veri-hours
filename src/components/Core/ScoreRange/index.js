import React from "react";
import { AiFillStar } from "react-icons/ai";
import classes from "./ScoreRange.module.css";
import { Label } from "../Label";

export function ScoreRange({ value, setter, label, min = 0, max = 100 }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setter(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={classes.scoreRangeContainer}>
      {label && <Label>{label}</Label>}
      <div className={classes.sliderWrapper}>
        <div className={classes.sliderContainer}>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            className={classes.slider}
            style={{
              background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`,
            }}
          />
          <div className={classes.sliderLabels}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
        <div
          className={classes.starContainer}
          style={{ left: `${percentage}%` }}
        >
          <AiFillStar className={classes.starIcon} />
          <span className={classes.scoreValue}>{value}</span>
        </div>
      </div>
    </div>
  );
}
