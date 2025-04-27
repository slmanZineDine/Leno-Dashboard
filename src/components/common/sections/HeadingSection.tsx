// My-Components
import PageHeading from "../heading/PageHeading";
import Breadcrumbs from "../navigate/Breadcrumbs";

type TProps = {
  title: string;
  hasBreadcrumbs?: boolean;
};

const HeadingSection = ({ title, hasBreadcrumbs = true }: TProps) => {
  return (
    <section className="container">
      {hasBreadcrumbs && <Breadcrumbs />}
      <PageHeading title={title} />
    </section>
  );
};

export default HeadingSection;
