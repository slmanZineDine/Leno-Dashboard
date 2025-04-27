type TLoadingDots = {
  size?: string;
  color?: string;
};

const LoadingDots = ({
  size = "loading-lg",
  color = "text-primary",
}: TLoadingDots) => {
  return (
    <div className="flex-center cursor-progress">
      <span className={`loading loading-dots ${size} ${color}`}></span>
    </div>
  );
};

export default LoadingDots;
