// Third-Party =====> react-router-dom
import { Link } from "react-router-dom";
// My-Components
import AsideLinks from "@components/common/aside/AsideLinks";
import ToggleMenu from "@components/common/navbar/ToggleMenu";
// Data
import { paths } from "@routes/paths";

type TAsideProps = {
  isShowAside: boolean;
  onLinkClick: (param: boolean) => void;
};

const Aside = ({ isShowAside, onLinkClick }: TAsideProps) => {
  return (
    <aside
      className={`bg-box-bg h-main-height fixed start-0 top-8 z-[200] ms-4 overflow-y-auto rounded-3xl transition-all duration-200 ${
        isShowAside ? "w-aside-width p-4" : "w-0 overflow-x-hidden"
      }`}
    >
      {isShowAside && (
        <ToggleMenu isShowAside={isShowAside} onToggleClick={onLinkClick} />
      )}
      <Link to={paths.home.root} className="flex-center mx-auto mb-6">
        <h2 className="text-primary text-center text-6xl font-extrabold">
          Leno
        </h2>
      </Link>
      <AsideLinks onLinkClick={onLinkClick} />
    </aside>
  );
};

export default Aside;
