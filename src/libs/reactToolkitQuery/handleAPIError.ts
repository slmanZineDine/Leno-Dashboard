// Third-Party =====> Redux
import { logOut } from "@redux/slices/auth/authSlice";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";

function handleApiError(result: any, api: any) {
  const error = result.error as RTKError;

  switch (result.error.status) {
    case "FETCH_ERROR":
      toastifyMsg(`${api.endpoint}: فشل في جلب البيانات.`, "error");
      break;

    case 400:
      toastifyMsg(error?.data?.message ?? "طلب خاطئ.", "error");
      break;

    case 401:
      if (api.endpoint !== "login") {
        api.dispatch(logOut());
      }
      break;

    case 403:
      if (["getSupervisorProfile", "getAdminProfile"].includes(api.endpoint)) {
        api.dispatch(logOut());
      } else if (api.endpoint !== "verifyAccount") {
        toastifyMsg(error?.data?.message ?? "الطلب غير مسموح", "error");
      }
      break;

    case 404:
      toastifyMsg(`الطلب غير موجود: ${api.endpoint}`, "error");
      break;

    case 422:
      if (api.endpoint !== "sendFCMToBackend") {
        const errorData = error?.data?.errors;

        const errArr = Object.values(errorData)?.[0];
        if (Array.isArray(errArr)) {
          toastifyMsg(errArr[0], "error");
        } else {
          toastifyMsg("فشل في التحقق", "error");
        }
      }
      break;

    case 429:
      if (api.endpoint !== "requestVerificationCode") {
        toastifyMsg(error?.data?.message ?? "عدد كبير من الطلبات.", "error");
      }
      break;

    case 500:
    case 503:
      toastifyMsg(error?.data?.message ?? "خطأ بالخادم.", "error");
      break;

    default:
      break;
  }
}

export default handleApiError;
