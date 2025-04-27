// React
import { ReactNode } from "react";
// Third-Party =====> react-countup
import CountUp from "react-countup";

type TProp = {
  count: number;
  title: string;
  icon: ReactNode;
  bgColor: string;
};

const StatisticBox = ({ count, title, icon, bgColor }: TProp) => {
  const theCount = isNaN(count) || typeof count === "undefined" ? 0 : count;

  return (
    <div
      className="flex-between rounded-3xl p-6 text-white drop-shadow-xl"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <CountUp
          className="text-3xl font-extrabold"
          duration={5}
          end={theCount}
        />
        <h2 className="text-lg text-white">{title}</h2>
      </div>
      <span className="rounded-2xl bg-white p-3 text-4xl text-gray-400">
        {icon}
      </span>
    </div>
  );
};

export default StatisticBox;
