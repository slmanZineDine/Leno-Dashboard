// React
import { useEffect } from "react";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";

const useNetworkStatus = () => {
  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const handleOffline = () => {
      toastifyMsg("غير متصل بالانترنت، يرجى التحقق من الاتصال.", "error");
    };

    const handleOnline = () => {
      toastifyMsg("تم إستعادة الاتصال بالانترنت .", "success");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
};

export default useNetworkStatus;
