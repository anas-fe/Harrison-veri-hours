import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import classes from "./BarChart.module.css";
import { formatNumber } from "@/helper/HelperFunction";

const BarChartComponent = ({ data, colorMap = {}, type }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltip}>
          <p className={classes.label}>{payload[0].payload.name}</p>
          <p className={classes.value}>
            {`${
              type === "money"
                ? formatNumber(payload[0].payload.value)
                : payload[0].payload.value
            }`}
          </p>
        </div>
      );
    }
    return null;
  };
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        dx={5}
        textAnchor="end"
        style={{
          fill: "#4A4A4A",
          fontSize: "14px",
        }}
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
        textAnchor="middle"
        style={{ fill: "#4A4A4A", fontSize: "14px" }}
      >
        {payload.value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReBarChart
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: 0,
          bottom: 0,
        }}
        barCategoryGap="10%"
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={<CustomYAxisTick />}
          domain={[0, 50]}
          tickCount={6}
        />
        <Tooltip cursor={false} content={<CustomTooltip />} />

        <Bar dataKey="value" barSize={80} radius={[5, 5, 0, 0]} fill="#4169E1">
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorMap[entry.name] || "#4169E1"}
            />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
