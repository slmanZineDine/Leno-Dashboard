// Third-Party =====> react-router-dom
import { Link } from "react-router-dom";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Icons
import { IoIosArrowBack } from "react-icons/io";
// Constants
import { Directions } from "constants/enums";
// Utils
import { cn } from "@libs/utils";

type TLinksListProps = {
  links: {
    id: number;
    title: string;
    link?: string;
    icon: React.ReactNode;
    isShow: boolean;
    children?: {
      id: number;
      title: string;
      link: string;
    }[];
  }[];
  className?: string;
};

const LinksList = ({ links, className = "" }: TLinksListProps) => {
  // ################### LOCALES ###################
  const { i18n } = useTranslation();

  return (
    <ul className={`divide-y-2 ${className}`}>
      {links.map(
        (link) =>
          link.isShow && (
            <li key={link.id}>
              <Link
                to={link?.children ? link.children[0].link : (link?.link ?? "")}
                className="flex-between group hover:bg-hover px-2 py-3"
              >
                <div
                  className={cn(
                    "flex items-center gap-4 transition-all group-hover:translate-x-4",
                    i18n.dir(i18n.language) === Directions.RTL &&
                      "group-hover:-translate-x-4",
                  )}
                >
                  {link.icon}
                  <h3 className="text-md">{link.title}</h3>
                </div>

                <IoIosArrowBack
                  className={cn(
                    "text-content rotate-180 text-xl transition-all duration-200",
                    i18n.dir(i18n.language) === Directions.RTL && "rotate-0",
                  )}
                />
              </Link>
            </li>
          ),
      )}
    </ul>
  );
};

export default LinksList;
