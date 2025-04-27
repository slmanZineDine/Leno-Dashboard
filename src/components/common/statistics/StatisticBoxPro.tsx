// React
import { ReactNode } from "react";
// Third-Party =====> react-countup
import CountUp, { CountUpProps } from "react-countup";

type TProp = {
  title: string;
  icon: ReactNode;
  containerClassName?: string;
  headerContainer?: string;
  countUpClassName?: string;
  countUpOptions: CountUpProps;
};

const StatisticBoxPro = ({
  title,
  icon,
  containerClassName,
  headerContainer,
  countUpClassName,
  countUpOptions,
}: TProp) => {
  return (
    <div
      className={`text-primary relative overflow-hidden rounded-2xl py-4 drop-shadow-xl before:absolute before:bottom-0 before:left-0 before:size-16 before:rounded-tl-full before:bg-white/10 after:absolute after:bottom-0 after:left-0 after:size-24 after:rounded-tl-full after:bg-white/10 ${containerClassName}`}
    >
      <div
        className={`mb-6 flex flex-col items-start gap-4 px-6 ${headerContainer}`}
      >
        <span className="rounded-3xl bg-white/15 p-3 text-4xl">{icon}</span>
        <h2 className="text-lg font-bold text-inherit">{title}</h2>
      </div>
      <CountUp
        className={`block w-full text-center text-2xl font-extrabold ${countUpClassName}`}
        duration={5}
        {...countUpOptions}
      />
    </div>
  );
};

export default StatisticBoxPro;
