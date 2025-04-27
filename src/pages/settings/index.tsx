// My-Components
import LinksList from "@components/common/list/LinksList";
import BoxContainer from "@components/common/box/BoxContainer";
import HeadingSection from "@components/common/sections/HeadingSection";
// My-Hooks
import useSettingsLinks from "@hooks/links/useSettingsLinks";

const SettingsPage = () => {
  // ################### CUSTOM HOOKS ###################
  const links = useSettingsLinks();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title="Settings" />

      {/* ========================== Content ========================== */}
      <section className="container">
        <BoxContainer>
          <LinksList links={links} />
        </BoxContainer>
      </section>
    </>
  );
};

export default SettingsPage;
