// React
import { lazy, Suspense } from "react";
// Third-Party =====> redux
import {
  selectIsAdmin,
  selectIsSupervisor,
} from "@redux/slices/auth/authSlice";
import { useAppSelector } from "@redux/hooks";
// My-Components
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";

// Lazy-Loading
const AdminHome = lazy(() => import("./AdminHome"));
const SupervisorHome = lazy(() => import("./SupervisorHome"));

const Home = () => {
  // ################### REDUX HOOKS ###################
  const isAdmin = useAppSelector(selectIsAdmin);
  const isSupervisor = useAppSelector(selectIsSupervisor);

  return (
    <Suspense
      fallback={<LoadingSpinner size="loading-lg" color="text-primary" />}
    >
      {isAdmin && <AdminHome />}
      {isSupervisor && <SupervisorHome />}
      {!isAdmin && !isSupervisor && (
        <LoadingSpinner size="loading-lg" color="text-primary" />
      )}
    </Suspense>
  );
};

export default Home;
