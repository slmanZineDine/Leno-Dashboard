import ModelComponent from "../modal/ModelComponent";

const ModelSkeleton = () => {
  return (
    <ModelComponent
      modelTitle=""
      onModelClose={() => {}}
      modelBoxClassName="animate-pulse"
    >
      <div className="h-52 w-full"></div>
    </ModelComponent>
  );
};

export default ModelSkeleton;
