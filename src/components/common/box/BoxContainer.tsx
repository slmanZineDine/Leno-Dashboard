// React
import { ReactNode } from "react";

type Props = {
  className?: String;
  children: ReactNode;
};

const BoxContainer = ({ className = "", children }: Props) => {
  return (
    <section className={`bg-box-bg rounded-xl p-4 ${className}`}>
      {children}
    </section>
  );
};

export default BoxContainer;
