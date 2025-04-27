// My-Components
import ModelHeader from "./ModelHeader";

type TModelComponentProps = {
  modelTitle: string;
  onModelClose: (isOpen: boolean) => void;
  modelBoxClassName?: string;
  children: React.ReactNode;
};

const ModelComponent = ({
  modelTitle,
  onModelClose,
  modelBoxClassName = "",
  children,
}: TModelComponentProps) => {
  return (
    <dialog className="modal modal-open">
      <div
        className={`modal-box bg-box-bg dark:text-white ${modelBoxClassName}`}
      >
        <ModelHeader title={modelTitle} onModelClose={onModelClose} />
        {children}
      </div>
    </dialog>
  );
};

export default ModelComponent;
