import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import classes from "./ReChart.module.css";

export default function ReChart({ data, height = 500 }) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.customTooltip}>
          <div className={classes.content_container}>
            <p className={classes.SuccessfulTitle}>Successful Transactions </p>
            <p className={classes.Value}>{`${payload[0]?.value}`}</p>
          </div>
          <div className={classes.content_container}>
            <p className={classes.failedTitle}>Failed Transactions: </p>
            <p className={classes.Value}>{`${payload[1]?.value}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };
  const ActiveDot = (props) => {
    const { cx, cy, setTop, setLeft } = props;
    setTop(cy);
    setLeft(cx);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={8} // Radius
        fill="#ffff" // Fill color
        fillOpacity={0.4} // Fill transparency
        stroke="#0000fc" // Border color
        strokeWidth={2} // Border width
      />
    );
  };
  const CustomCursor = (props) => {
    const { customTop, customLeft, height } = props;
    return (
      <line
        x1={customLeft}
        y1={customTop}
        x2={customLeft}
        y2={height}
        stroke="#0000fc"
        strokeWidth={4}
        strokeDasharray={"8 8"}
      />
    );
  };
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dx={0} textAnchor="end" style={{ fill: "#748AA1" }}>
        {payload.value}
      </text>
    );
  };
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dy={20} textAnchor="middle" style={{ fill: "#748AA1" }}>
        {payload.value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <AreaChart
        width={500}
        height={0}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: -5,
          bottom: 0,
        }}
        padding={{
          top: 0,
          right: 0,
          left: 10,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="10%" stopColor="green" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          horizontal={true}
          strokeDasharray="6 6"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
        <Tooltip
          cursor={<CustomCursor customTop={top} customLeft={left} />}
          // cursor={{ strokeDasharray: "3 3", stroke: "#FFB300" }}
          content={<CustomTooltip />}
        />
        <Area
          type="monotone"
          dataKey="fail"
          stroke="red"
          strokeWidth={2}
          fill="transparent"
          activeDot={<ActiveDot setTop={setTop} setLeft={setLeft} />} // Use the ActiveDot component here
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="green"
          strokeWidth={2}
          fill="url(#strokeGradient)" //if you dont want to use gradient you can use fill="transparent"
          activeDot={<ActiveDot setTop={setTop} setLeft={setLeft} />} // Use the ActiveDot component here
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
