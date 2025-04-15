import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function getYearTicks(data) {
  const years = new Set();
  return data
  .filter((item) => {
    const year = item.month.split("-")[0];
    if (!years.has(year)) {
      years.add(year);
      return true;
    }
    return false;
  })
  .map((item) => item.month); // z. B. ["2021-01", "2022-01"]
}

export default function ValuesOverTimeByMonthChart({ data }) {
  return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" reversed={true} ticks={getYearTicks(data)}
                 tickFormatter={(month) => month.split("-")[0]}/>
          <YAxis />
          <Tooltip />
          <Line  isAnimationActive={false} dot={false} strokeWidth={3} type="monotone" dataKey="count" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
  );
}