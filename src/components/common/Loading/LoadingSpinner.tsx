type TLoadingSpinner = {
  size?: string;
  color?: string;
  className?: string;
};

const LoadingSpinner = ({
  size = "loading-lg",
  color = "text-primary",
  className = "",
}: TLoadingSpinner) => {
  return (
    <div className={`flex-center cursor-progress ${className}`}>
      <span className={`loading loading-spinner ${size} ${color}`}></span>
    </div>
  );
};

export default LoadingSpinner;
