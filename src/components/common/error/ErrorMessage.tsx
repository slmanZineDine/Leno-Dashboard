// Libs
import isRTKError from "@libs/reactToolkitQuery/isRTKError";
import { paths } from "@routes/paths";
import { Navigate } from "react-router-dom";

type TErrorMessageProps = {
  error: RTKError | undefined | unknown;
};

const ErrorMessage = ({ error }: TErrorMessageProps) => {
  if (isRTKError(error)) {
    const { status, data } = error ?? {};
    const statusCode = status ?? "خطأ";
    let msg = data?.message ?? "حدث خطأ ما، الرجاء المحاولة لاحقاً.";

    if (statusCode === 422) {
      const errArr = Object.values(error.data.errors)?.[0];
      msg = Array.isArray(errArr) ? errArr[0] : msg;
    }

    if (statusCode === 404) {
      return <Navigate to={paths.notFound} replace />;
    }

    return (
      <div className="my-4 text-center">
        <span className="text-heading text-4xl font-bold">{statusCode}</span>
        <p className="mt-4 text-xl text-red-400">{msg}</p>
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <span className="text-heading text-4xl font-bold">خطأ</span>
        <p className="mt-4 text-xl text-red-400">
          حدث خطأ ما، الرجاء المحاولة لاحقاً.
        </p>
      </div>
    );
  }
};

export default ErrorMessage;
