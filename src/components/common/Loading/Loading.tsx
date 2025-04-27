// React
import { ReactNode } from "react";
// My-Components
import ErrorMessage from "@components/common/error/ErrorMessage";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";

type TLoadingProps = {
  isLoading: boolean;
  error?: RTKError | undefined | unknown;

  children: ReactNode;
};

const Loading = ({ isLoading, error, children }: TLoadingProps) => {
  if (isLoading) {
    return (
      <LoadingSpinner size="loading-lg" color="text-primary" className="pt-4" />
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <>{children}</>;
};

export default Loading;
