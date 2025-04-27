// My-Components

// import LoadingDots from "./LoadingDots";
// Images
import Logo from "@assets/images/full_logo.png";
import LoadingDots from "./LoadingDots";

const PageLoading = () => {
  return (
    <div className="flex-center bg-box-bg fixed top-0 left-0 z-1000 min-h-screen w-full bg-cover bg-bottom bg-no-repeat">
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="flex-center mx-auto mb-4 block max-w-52 min-w-40"
        />
        <div className="flex-center mt-10 gap-2">
          <p className="text-heading text-xl font-bold dark:text-white">
            Loading...
          </p>
          <LoadingDots size="loading-md" color="text-[#13375e]" />
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
