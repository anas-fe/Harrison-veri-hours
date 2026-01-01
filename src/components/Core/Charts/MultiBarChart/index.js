import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import classes from "./BarChart.module.css";
import { formatNumber } from "@/helper/HelperFunction";

// Color schemes
const statusColorMap = {
  cancelled: "#FF6B6B", // Red shade
  confirmed: "#4CAF50", // Green shade
  pending: "#FFD700", // Yellow shade
  completed: "#1E90FF", // Blue shade
};

const colorMap = {
  cancelled: "#FFE3E3", // Dark blue
  confirmed: "#00AF26", // Medium-dark blue
  pending: "#DAEAFF", // Medium blue
  completed: "#ECFDF3", // Light blue
};

const greenShades = {
  cancelled: "#166534", // Dark green
  confirmed: "#16A34A", // Medium green
  pending: "#22C55E", // Light green
  completed: "#4ADE80", // Very light green
};

const redShades = {
  cancelled: "#991B1B", // Dark red
  confirmed: "#DC2626", // Medium red
  pending: "#EF4444", // Light red
  completed: "#F87171", // Very light red
};

// Data for July only
const julyData = [
  { name: "Jul", cancelled: 1, confirmed: 6, pending: 13, completed: 1 },
];

const MultiBarChartComponent = ({
  data = [],
  colorScheme = "blue", // "default", "blue", "green", "red"
  type,
}) => {
  // Select color scheme based on prop
  const getColorScheme = () => {
    switch (colorScheme) {
      case "blue":
        return colorMap;
      case "green":
        return greenShades;
      case "red":
        return redShades;
      default:
        return colorMap;
    }
  };

  const selectedColorMap = getColorScheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltip}>
          {payload.map((entry, index) => (
            <p key={index} className={classes.label}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
          <p className={classes.label}>Month: {label}</p>
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
        style={{ fill: "#3d3d3a", opacity: "0.6", fontSize: "14px" }}
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
        style={{ fill: "#3d3d3a", opacity: "0.6" }}
      >
        {payload.value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReBarChart
        data={transformedData(data)}
        margin={{
          top: 0,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{ fontWeight: "400", opacity: "0.6" }}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontWeight: "400", opacity: "0.6" }}
          tick={<CustomYAxisTick />}
        />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Legend content={<CustomLegend colors={selectedColorMap} />} />

        <Bar
          dataKey="cancelled"
          name="Cancelled"
          fill={selectedColorMap.cancelled}
          radius={[0, 0, 0, 0]}
          stackId="a"
        />
        <Bar
          dataKey="confirmed"
          name="Confirmed"
          fill={selectedColorMap.confirmed}
          radius={[0, 0, 0, 0]}
          stackId="a"
        />
        <Bar
          dataKey="pending"
          name="Pending"
          fill={selectedColorMap.pending}
          radius={[0, 0, 0, 0]}
          stackId="a"
        />
        <Bar
          dataKey="completed"
          name="Completed"
          fill={selectedColorMap.completed}
          radius={[10, 10, 0, 0]}
          stackId="a"
        />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default MultiBarChartComponent;

const monthAbbr = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const transformedData = (input) =>
  input.map((item) => {
    const month = monthAbbr[item.month];
    const result = {
      name: month,
      cancelled: 0,
      confirmed: 0,
      pending: 0,
      completed: 0,
    };

    item.data.forEach((entry) => {
      if (result.hasOwnProperty(entry.status)) {
        result[entry.status] = entry.count;
      }
    });

    return result;
  });

const CustomLegend = ({ payload, colors }) => {
  return (
    <ul className={classes.legend}>
      {payload?.map((entry, index) => (
        <li key={index} style={{ display: "flex", alignItems: "center" }}>
          <span
            className={classes.legendColor}
            style={{
              backgroundColor: colors[entry.dataKey],
            }}
          ></span>
          <span className={classes.legendText}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};
