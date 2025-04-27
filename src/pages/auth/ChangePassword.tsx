// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import BoxContainer from "@components/common/box/BoxContainer";
import HeadingSection from "@components/common/sections/HeadingSection";
import ChangePasswordForm from "@components/dashboard/profile/ChangePasswordForm";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";

const ChangePassword = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["change-password"])} />

      {/* ========================== Form ========================== */}
      <section className="container">
        <BoxContainer>
          <ChangePasswordForm />
        </BoxContainer>
      </section>
    </>
  );
};

export default ChangePassword;
