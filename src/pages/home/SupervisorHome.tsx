// Third-Party =====> redux
import { useAppSelector } from "@redux/hooks";
import { selectCurrenTUsername } from "@redux/slices/auth/authSlice";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import BoxHeader from "@components/common/box/BoxHeader";
import LinksList from "@components/common/list/LinksList";
import BoxContainer from "@components/common/box/BoxContainer";
import HeadingSection from "@components/common/sections/HeadingSection";
// My-Hooks
import useAsideLinks from "@hooks/links/useAsideLinks";
// Icons
import { FaLink } from "react-icons/fa6";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";

const SupervisorHome = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### REDUX HOOKS ###################
  const user = useAppSelector(selectCurrenTUsername);

  // ################### CUSTOM HOOKS ###################
  const links = useAsideLinks();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["/"])} hasBreadcrumbs={false} />
      <section className="container">
        <BoxContainer>
          <div className="h-full py-6 text-center">
            <h2 className="mb-2 text-2xl font-bold">
              {t("home.welcomeMessage")} &nbsp;
              <span className="text-primary font-bold">{user}</span>
            </h2>
          </div>
          <BoxHeader
            title={t("home.linksTitle")}
            icon={<FaLink className="text-heading text-2xl" />}
          />
          <LinksList links={links} className="ps-4" />
        </BoxContainer>
      </section>
    </>
  );
};

export default SupervisorHome;
