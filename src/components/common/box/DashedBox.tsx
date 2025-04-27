import { ReactNode } from "react";

type TDashedBox = {
  title: string;
  icon?: ReactNode;
  contentClassName?: string;
  children: ReactNode;
};

const DashedBox = ({ title, icon, contentClassName, children }: TDashedBox) => {
  return (
    <div className="mt-8 border-t-2 border-dashed pt-4">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
        {icon}
        {title}
      </h2>
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default DashedBox;
