// React
import React, { useState } from "react";
// Third-Party =====> React-Router
import { NavLink } from "react-router-dom";

type Props = {
  mainLink: {
    title: string;
    icon: React.ReactNode;
  };
  links: { id: number; link: string; title: string; isShow: boolean }[];
  onLinkClick: (param: boolean) => void;
};

const AsideSubLinks = ({ mainLink, links, onLinkClick }: Props) => {
  // ################### REACT HOOKS ###################
  const [isShowSubLinks, setIsShowSubLinks] = useState(false);

  // ################### DATA ###################
  const { title, icon } = mainLink;

  return (
    <>
      <button
        className="hover:bg-hover focus:bg-activeBg focus:text-primary flex w-full items-center gap-2 rounded-2xl p-4 text-lg font-bold transition-all duration-300"
        onClick={() => setIsShowSubLinks(!isShowSubLinks)}
      >
        {icon}
        {title}
      </button>

      {isShowSubLinks && (
        <ul className="bg-mainBg shadow-form-shadow rounded-2xl">
          {links.map(
            (link) =>
              link.isShow && (
                <li
                  key={link.id}
                  onClick={() => {
                    if (document.body.clientWidth < 992) onLinkClick(false);
                  }}
                >
                  <NavLink
                    to={link.link}
                    end
                    className={({ isActive }) =>
                      `before:bg-primary hover:text-primary relative block px-4 py-3 text-base transition-all duration-300 ${
                        isActive ? "text-primary" : ""
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ),
          )}
        </ul>
      )}
    </>
  );
};

export default AsideSubLinks;
