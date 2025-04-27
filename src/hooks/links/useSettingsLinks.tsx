// Third-Party =====> redux
import { useAppSelector } from "@redux/hooks";
import { selectIsAdmin } from "@redux/slices/auth/authSlice";
// Icons
import { RiSettings3Fill } from "react-icons/ri";
// Data
import { paths } from "@routes/paths";

const useSettingsLinks = () => {
  // ################### REDUX HOOKS ###################
  const isAdmin = useAppSelector(selectIsAdmin);

  // ################### DATA ###################
  const links = [
    {
      id: 1,
      title: "Settings",
      link: paths.settings.appSettings,
      icon: <RiSettings3Fill className="text-content text-xl" />,
      isShow: isAdmin,
    },
  ];

  return links;
};

export default useSettingsLinks;
