import { IoStatsChartSharp } from "react-icons/io5";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import classes from "./PieChart.module.css";
import { useMediaQuery } from "@/customHooks/useMediaQuery";

export default function Recharts({ type, data }) {
  const barData = [
    { name: "Jan", value: 25 },
    { name: "Feb", value: 85 },
    { name: "Mar", value: 55 },
    { name: "Apr", value: 90 },
    { name: "May", value: 15 },
    { name: "Jun", value: 25 },
    { name: "Jul", value: 45 },
    { name: "Aug", value: 60 },
    { name: "Sep", value: 25 },
    { name: "Oct", value: 100 },
    { name: "Nov", value: 15 },
    { name: "Dec", value: 70 },
  ];

  const lineData = [
    { name: "Jan", value: 240 },
    { name: "Feb", value: 139 },
    { name: "Mar", value: 980 },
    { name: "Apr", value: 390 },
    { name: "May", value: 450 },
    { name: "Jun", value: 250 },
    { name: "Jul", value: 650 },
    { name: "Aug", value: 590 },
    { name: "Sep", value: 390 },
    { name: "Oct", value: 490 },
    { name: "Nov", value: 390 },
    { name: "Dec", value: 690 },
  ];

  const requestData = [
    { name: "Group A", value: 500 },
    { name: "Group B", value: 400 },
  ];

  const COLORS = ["#1789C9", "#023878", "#9ACD32", "#FF69B4"]; // Blue, Red, Yellow-green, Pink

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.customTooltip}>
          <IoStatsChartSharp color="#fff" />
          <p> {`$${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const CustomTooltips = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "white",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            textAlign: "center",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{payload[0].name}</p>
          <p style={{ margin: 0 }}>{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="var(--black-color)"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {name} {value}
      </text>
    );
  };

  const screenSize = useMediaQuery("(max-width: 400px)");

  return (
    <>
      {(!type || type === "pie") && (
        <div className={classes.pieChartContainer}>
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart barGap={10}>
              <Pie
                data={data}
                cx="35%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={screenSize ? 105 : 135}
                fill="#8884d8"
                dataKey="value"
                stroke="#FFF"
                strokeWidth={8}
                innerRadius={screenSize ? 85 : 80}
                cornerRadius={10}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltips />} />
            </PieChart>
          </ResponsiveContainer>

          <div className={classes.legendContainer}>
            {data?.map((entry, index) => (
              <div key={index} className={classes.legendItem}>
                <span
                  className={classes.legendDot}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className={classes.legendText}>
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "bar" && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={barData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BC6471" stopOpacity={1} />
                <stop offset="100%" stopColor="#CDA3A9" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis stroke="0px" color="#4A4A4A" />
            {/* <Tooltip /> */}
            <Bar
              dataKey="value"
              fill="url(#colorUv)"
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {type === "line" && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={lineData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 " vertical={false} />
            <XAxis dataKey="name" stroke="0px" />
            <YAxis stroke="0px" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--main-color)"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {type === "request" && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={requestData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {requestData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                value={`${requestData[0].value}`}
                position="center"
                style={{ fill: "var(--primary-color)", fontSize: 18 }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
