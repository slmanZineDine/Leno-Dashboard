import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type TProps = {
  data: any;
};

const PieChartComponent = ({ data }: TProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // labelLine={false}
          // label={renderCustomizedLabel}
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={data[index].color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

export default PieChartComponent;
