// React
import { useState } from "react";
// Third-Party =====> React-Router
import { Outlet } from "react-router-dom";
// My-Components
import Aside from "@components/common/aside/Aside";
import Header from "@components/common/header";
import Footer from "@components/common/footer/Footer";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// My-Hooks
import useGetUserProfile from "@hooks/getData/useGetUserProfile";

const MainLayout = () => {
  // ################### REACT HOOKS ###################
  const [toggleAside, setToggleAside] = useState(
    document.body.clientWidth > 991,
  );
  // ################### CUSTOM HOOKS ###################
  const [isLoading] = useGetUserProfile();

  return (
    <div className="max-w-8xl mx-auto">
      <div className={`${toggleAside ? "8xl:ms-aside-width" : ""}`}>
        <Aside isShowAside={toggleAside} onLinkClick={setToggleAside} />
        <div
          className={`grid min-h-[100dvh] grid-cols-1 grid-rows-[auto_1fr_auto] ${toggleAside ? "8xl:ms-0" : ""}`}
        >
          <Header
            isShowAside={toggleAside}
            onToggleClick={setToggleAside}
            isLoading={isLoading}
          />
          <main className="mt-header-height max-w-full rounded-lg px-4 py-8">
            {isLoading ? (
              <LoadingSpinner size="loading-lg" color="text-primary" />
            ) : (
              <Outlet />
            )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
