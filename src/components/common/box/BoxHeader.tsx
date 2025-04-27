// React
import { ReactNode } from "react";

type Props = {
  title: string;
  icon?: ReactNode;
  className?: String;
  titleColor?: string;
  children?: ReactNode;
};

const BoxHeader = ({
  title,
  icon = null,
  children,
  className = "",
  titleColor = "text-heading",
}: Props) => {
  return (
    <header
      className={`flex-between max-clg:flex-col max-clg:items-start mb-4 w-full gap-4 ${className}`}
    >
      <div className="flex-center gap-2">
        {icon}
        <h2 className={`text-lg font-extrabold capitalize ${titleColor}`}>
          {title}
        </h2>
      </div>
      {children}
    </header>
  );
};

export default BoxHeader;
