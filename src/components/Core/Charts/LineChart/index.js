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
    <ResponsiveContainer width="100%" height={400}>
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
        <CartesianGrid vertical={false} horizontal={false} />
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
          cursor={{ strokeDasharray: "3 3", stroke: "#FFB300" }}
        />
        {/* {showLegend && (
          <Legend
            content={<CustomLegend />}
            wrapperStyle={{ paddingTop: "20px" }}
          />
        )} */}
        <Line
          type="monotone"
          dataKey="Alerts"
          stroke="#FF0000"
          strokeWidth={3}
          activeDot={{ r: 6 }}
          dot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Check-Ins"
          stroke="#9ACD32"
          strokeWidth={3}
          activeDot={{ r: 6 }}
          dot={{ r: 5 }}
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
            <p
              className={
                entry.dataKey === "Alerts"
                  ? classes.alertTitle
                  : classes.checkInTitle
              }
            >
              {entry.dataKey}:{" "}
            </p>
            <p className={classes.Value}>{`${entry.value}`}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// const CustomLegend = ({ payload }) => {
//   return (
//     <div className={classes.legendContainer}>
//       {payload?.map((entry, index) => (
//         <div key={index} className={classes.legendItem}>
//           <span
//             className={classes.legendDot}
//             style={{ backgroundColor: entry.color }}
//           ></span>
//           <span className={classes.legendText}>{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// };
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
