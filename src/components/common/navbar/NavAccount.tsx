// Third-Party =====> react-router
import { Link } from "react-router-dom";
// Third-Party =====> redux
import { useAppSelector } from "@redux/hooks";
import {
  selectCurrentRole,
  selectCurrentEmail,
  selectCurrentImage,
  selectCurrenTUsername,
} from "@redux/slices/auth/authSlice";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Logout from "./Logout";
import LoadingDots from "@components/common/Loading/LoadingDots";
import NavDropdown from "@components/common/dropdown/NavDropdown";
// Icons
import { FaUser } from "react-icons/fa6";
// Data
import { paths } from "@routes/paths";
// Images
import userAvatar from "@assets/images/user_avatar.png";

const PROFILE_PATH: { [key: string]: string } = {
  admin: paths.adminProfile.root,
  supervisor: paths.supervisorProfile.root,
};

const NavAccount = ({ isLoading }: { isLoading: boolean }) => {
  // ################### REDUX HOOKS ###################
  const username = useAppSelector(selectCurrenTUsername);
  const email = useAppSelector(selectCurrentEmail);
  const image = useAppSelector(selectCurrentImage);
  const role = useAppSelector(selectCurrentRole);

  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <NavDropdown
      icon={
        <div className="flex-center size-12 rounded-2xl bg-[#f7f7f7]">
          <img
            className="size-full rounded-2xl object-cover"
            src={image ? image : userAvatar}
            alt="user-img"
          />
        </div>
      }
      dropdownClassName="end-4 whitespace-nowrap"
    >
      <ul>
        <li className="border-border border-b px-4 py-2 text-center">
          {isLoading ? (
            <LoadingDots size="loading-md" />
          ) : (
            <>
              <h3 className="text font-bold">{username}</h3>
              <span className="text-text text-sm">{email}</span>
            </>
          )}
        </li>
        <li>
          <Link
            to={role ? PROFILE_PATH[role] : paths.home.root}
            className="border-border hover:bg-hover flex w-full items-center gap-2 border-b px-4 py-2 transition-all duration-300"
          >
            <FaUser className="text-xl" />
            {t("navbar.myAccount")}
          </Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </NavDropdown>
  );
};

export default NavAccount;
