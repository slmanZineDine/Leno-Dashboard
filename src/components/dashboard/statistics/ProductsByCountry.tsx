import { useTranslation } from "react-i18next";
import {
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const countries = [
  { name: "Japan", count: 126 },
  { name: "Germany", count: 83 },
  { name: "Canada", count: 38 },
  { name: "Brazil", count: 213 },
  { name: "Australia", count: 26 },
  { name: "France", count: 68 },
  { name: "India", count: 1380 },
  { name: "United States", count: 331 },
  { name: "Russia", count: 145 },
  { name: "South Africa", count: 59 },
];

const ProductsByCountry = () => {
  const { t } = useTranslation();

  return (
    <section className="container mb-8">
      <div className="bg-box-bg rounded-lg p-4">
        <h3 className="mb-6 text-2xl font-bold">
          {t("statistics.sections.products.title")}
        </h3>
        <section className="mx-auto h-52 px-2 text-xs">
          <ResponsiveContainer height="100%">
            <BarChart
              width={500}
              height={300}
              data={countries}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ strokeWidth: 2 }} />
              <YAxis tick={{ stroke: "#6b7280" }} tickMargin={25} />
              <Bar
                dataKey="count"
                fill="#0157B4"
                maxBarSize={10}
                radius={[10, 10, 0, 0]}
              />
              <Tooltip
                formatter={(value) => [`${value} ${t("common.products")}`]}
                labelFormatter={(name) => name}
                contentStyle={{
                  backgroundColor: "#0157B4",
                  borderRadius: ".5rem",
                  border: "none",
                  color: "white",
                  fontSize: "1.2rem",
                  width: "150px",
                }}
                labelStyle={{ marginBottom: ".5rem" }}
                itemStyle={{ color: "white", fontWeight: "500" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </section>
  );
};

export default ProductsByCountry;
