type Props = { title: string };

const PageHeading = ({ title }: Props) => {
  return (
    <section className="mb-12">
      <h2 className="text-heading text-3xl font-bold">{title}</h2>
    </section>
  );
};

export default PageHeading;
