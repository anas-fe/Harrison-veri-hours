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
import classes from "./AreaChart.module.css";
import { formatNumber } from "@/helper/HelperFunction";

export default function AreaChartComponent({ data, height = 400, type }) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltip}>
          <p className={classes.label}>{payload[0].payload.name}</p>
          <p className={classes.value}>
            {`${
              type === "money"
                ? formatNumber(payload[0].payload.uv)
                : payload[0].payload.uv
            }`}
          </p>
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
        r={6} // Radius
        fill="#ffff" // Fill color
        strokeWidth={2} // Border width
        stroke="#4F81FF"
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
        stroke="var(--icon-color)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
    );
  };
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        textAnchor="end"
        style={{ fill: "var(--secondary-color)", fontSize: "14px" }}
      >
        {type === "money" ? formatNumber(payload.value) : payload.value}
      </text>
    );
  };
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        dy={15}
        dx={10}
        textAnchor="middle"
        style={{ fill: "var(--secondary-color)", fontSize: "14px" }}
      >
        {payload.value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <AreaChart
        width={500}
        height={"100%"}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        padding={{
          top: 0,
          right: 0,
          left: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient
            id="areaGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="-73.84%" stop-color="rgba(201, 156, 70, 0.50)" />
            <stop offset="107.95%" stop-color="rgba(201, 156, 70, 0.00)" />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={true}
          horizontal={true}
          strokeDasharray="1 1"
          stroke="#5C5C5C"
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
          content={<CustomTooltip />}
        />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="var(--primary-color)"
          strokeWidth={2}
          fill="url(#areaGradient)"
          activeDot={<ActiveDot setTop={setTop} setLeft={setLeft} />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
