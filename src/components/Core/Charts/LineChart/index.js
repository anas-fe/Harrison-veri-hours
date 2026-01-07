import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import classes from "./LineChart.module.css";

export default function LineChartComponent({data}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} horizontal={true} />
        <XAxis
          dataKey="name"
          stroke="var(--text-color)"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          stroke="var(--text-color)"
          axisLine={false}
          tickLine={false}
          tick={<CustomYAxisTick />}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
        />
          <Legend
            content={<CustomLegend />}
            wrapperStyle={{ position: "absolute", top: "-60px" }}
          />
        <Line
          type="monotone"
          dataKey="Hours Submitted"
          stroke="#1789C9"
          strokeWidth={4}
          activeDot={{ r: 6 }}
          dot={{ r: 0 }}
        />
        <Line
          type="monotone"
          dataKey="Hours Approved"
          stroke="#023878"
          strokeWidth={4}
          activeDot={{ r: 6 }}
          dot={{ r: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={classes.customTooltip}>
        {payload.map((entry, index) => (
          <div key={index} className={classes.content_container}>
            <p className={classes.Value} style={{ color: entry.color }}>{`${entry.value}`}</p>
            <p
              className={
                entry.dataKey === "Alerts"
                  ? classes.alertTitle
                  : classes.checkInTitle
              }
            >
              {entry.dataKey}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className={classes.legendContainer}>
      {payload?.map((entry, index) => (
        <div key={index} className={classes.legendItem}>
          <span
            className={classes.legendDot}
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className={classes.legendText}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      dy={18}
      textAnchor="middle"
      style={{ fill: "var(--text-color)" }}
    >
      {payload.value}
    </text>
  );
};
const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      dx={-10}
      textAnchor="end"
      style={{ fill: "var(--text-color)" }}
    >
      {payload.value}
    </text>
  );
};
