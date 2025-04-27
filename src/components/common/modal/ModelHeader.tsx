type TModelHeader = {
  title: string;
  onModelClose: (param: boolean) => void;
};

const ModelHeader = ({ title = "", onModelClose }: TModelHeader) => {
  return (
    <header className="relative mb-6">
      <button
        className="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
        onClick={() => onModelClose(false)}
      >
        ✕
      </button>

      <h3 className="text-center text-xl font-bold">{title}</h3>
    </header>
  );
};

export default ModelHeader;
