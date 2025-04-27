// Third-Party =====> react-router
import { Link } from "react-router-dom";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import UserImgProfile from "@components/dashboard/profile/UserImgProfile";
import ToolsMenu from "@components/common/toolsMenu/ToolsMenu";
// Icons
import { MdEmail } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";
import { TUser } from "@customTypes/user/user";
import { FaBirthdayCake } from "react-icons/fa";
import { PiGenderIntersex } from "react-icons/pi";
import { RiDeleteBin6Line, RiLockPasswordFill } from "react-icons/ri";
// Data
import { paths } from "@routes/paths";
import { TUserRolesValues, UserRoles } from "constants/enums";

type TProfileProps = TUser & {
  isOwn?: boolean;
  userRole?: TUserRolesValues;
  editingPagePath: string;
  handleDelete?: () => void;
};

const Profile = ({
  isOwn = false,
  userRole = UserRoles.Customer,
  ...props
}: TProfileProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### DATA ###################
  const { firstName, lastName, email, birthDate, phone, gender, image } = props;
  const profileData = [
    {
      id: 1,
      title: t("profile.email"),
      value: email,
      icon: <MdEmail />,
      isShow: true,
    },
    {
      id: 2,
      title: t("profile.gender"),
      value: gender,
      icon: <PiGenderIntersex className="text-xl" />,
      isShow: true,
    },
    {
      id: 3,
      title: t("profile.phoneNumber"),
      value: phone,
      icon: <FaPhoneFlip />,
      isShow: true,
    },
    {
      id: 4,
      title: t("profile.birthDate"),
      value: birthDate,
      icon: <FaBirthdayCake />,
      isShow: true,
    },
  ];

  return (
    <>
      <section className="bg-box-bg rounded-lg pb-12">
        {/* ========================== Poster & Profile Image ========================== */}
        <div className="border-border relative flex h-72 justify-center border-b">
          <h2 className="text-primary/85 absolute top-1/2 -translate-y-1/2 text-center text-8xl font-extrabold tracking-wider">
            Leno
          </h2>
          <div className="bg-box-bg absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-4">
            <UserImgProfile imageURL={image} />
          </div>

          {/* ========================== Tools Menu ========================== */}
          <ToolsMenu>
            <ul className="bg-body-bg text-text absolute start-0 top-[120%] w-56 rounded-md p-1 shadow-2xl">
              <li>
                <Link
                  to={props.editingPagePath}
                  className="text-md hover:bg-hover flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors duration-300"
                >
                  <BiEdit className="shrink-0 text-lg text-green-500" />
                  {t("profile.editProfile")}
                </Link>
              </li>
              {isOwn && (
                <li>
                  <Link
                    to={paths.changePassword}
                    className="text-md hover:bg-hover flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors duration-300"
                  >
                    <RiLockPasswordFill className="shrink-0 text-lg text-yellow-500" />
                    {t("profile.changePassword")}
                  </Link>
                </li>
              )}
              {!isOwn && (
                <li
                  className="text-md hover:bg-hover flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors duration-300"
                  onClick={props.handleDelete}
                >
                  <RiDeleteBin6Line className="shrink-0 text-lg text-red-500" />
                  {t("profile.deleteAccount")}
                </li>
              )}
            </ul>
          </ToolsMenu>
        </div>

        {/* ========================== Name ========================== */}
        <div className="mt-20 text-center">
          <h2 className="mb-2 text-3xl font-bold">{`${firstName} ${lastName}`}</h2>
          {!isOwn && (
            <span className="text-xl text-blue-400">
              {t(`profile.${userRole}`)}
            </span>
          )}
        </div>

        {/* ========================== Main Data ========================== */}
        <div className="clg:grid-cols-2 7xl:grid-cols-4 mt-10 grid grid-cols-1 gap-4 px-6">
          {profileData.map(
            (col) =>
              col.isShow && (
                <div
                  key={col.id}
                  className="text-md relative overflow-hidden text-center"
                >
                  <h2 className="flex-center text-md mb-2 gap-2">
                    {col.icon} {col.title}
                  </h2>
                  <p
                    className={`text-content w-full ${String(col.value).length > 25 ? "animate-scrolling-text-x" : ""}`}
                  >
                    {col.value ?? t("common.unSelect")}
                  </p>
                </div>
              ),
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
