// React
import { ReactNode } from "react";
// Third-Party => React-Router
import { NavLink } from "react-router-dom";

type Props = {
  link: string;
  icon: ReactNode;
  title: string;
  onLinkClick: (params: boolean) => void;
};

const AsideMainLink = ({ link, icon, title, onLinkClick }: Props) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex-between rounded-2xl p-4 transition-all duration-300 ${
          isActive ? "bg-activeBg text-primary" : "hover:bg-hover"
        }`
      }
      onClick={() => {
        if (document.body.clientWidth < 992) onLinkClick(false);
      }}
    >
      <div className="flex items-center gap-2 text-lg font-bold">
        {icon}
        {title}
      </div>
    </NavLink>
  );
};

export default AsideMainLink;
