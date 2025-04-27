// Third-Party =====> redux
import { useAppSelector } from "@redux/hooks";
import { selectIsAdmin } from "@redux/slices/auth/authSlice";
import { selectCurrenTUserPermissions } from "@redux/slices/permissions/permissionsSlice";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Icons
import { SlHome } from "react-icons/sl";
import { IoCart } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { FaCalendarAlt } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import { GiShoppingBag } from "react-icons/gi";
import { BiSolidError } from "react-icons/bi";
import { RiAdminFill, RiSettings3Fill } from "react-icons/ri";
// Data
import { paths } from "@routes/paths";
import { pathTitleMap } from "@routes/pathTitleMap";

const useAsideLinks = () => {
  // ################### REDUX HOOKS ###################
  const isAdmin = useAppSelector(selectIsAdmin);
  const permission = useAppSelector(selectCurrenTUserPermissions);

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### DATA ###################
  const links = [
    {
      id: 1,
      title: t(pathTitleMap["/"]),
      link: paths.home.root,
      icon: <SlHome className="text-2xl" />,
      isShow: true,
    },
    {
      id: 2,
      title: t(pathTitleMap["customers"]),
      icon: <FaUsers className="text-2xl" />,
      children: [
        {
          id: 1,
          title: t("aside.customersList"),
          link: paths.customers.root,
          isShow: true,
        },
        {
          id: 2,
          title: t(pathTitleMap["add-customer"]),
          link: paths.customers.addCustomer,
          isShow: isAdmin,
        },
      ],
      isShow: isAdmin,
    },
    {
      id: 4,
      title: t(pathTitleMap["orders"]),
      link: paths.orders.root,
      icon: <IoCart className="text-2xl" />,
      isShow: isAdmin || permission.view?.bookings,
    },
    {
      id: 5,
      title: t(pathTitleMap["calendar"]),
      link: paths.calendar.root,
      icon: <FaCalendarAlt className="text-2xl" />,
      isShow: true,
    },
    {
      id: 6,
      title: t(pathTitleMap["products"]),
      icon: <GiShoppingBag className="text-2xl" />,
      children: [
        {
          id: 1,
          title: t(pathTitleMap["categories"]),
          link: paths.categories.root,
          isShow: true,
        },
        {
          id: 2,
          title: t("aside.productsList"),
          link: paths.products.root,
          isShow: true,
        },
        {
          id: 3,
          title: t(pathTitleMap["add-product"]),
          link: paths.products.addProduct,
          isShow: true,
        },
      ],
      isShow: true,
    },
    {
      id: 9,
      title: t(pathTitleMap["complaints"]),
      link: paths.complaints.root,
      icon: <AiFillAlert className="text-2xl" />,
      isShow: isAdmin,
    },
    {
      id: 10,
      title: t(pathTitleMap["statistics"]),
      link: paths.statistics.root,
      icon: <FcStatistics className="text-2xl" />,
      isShow: isAdmin,
    },
    {
      id: 11,
      title: t(pathTitleMap["settings"]),
      link: paths.settings.root,
      icon: <RiSettings3Fill className="text-2xl" />,
      isShow: isAdmin,
    },
    {
      id: 12,
      title: t("aside.admin"),
      icon: <RiAdminFill className="text-2xl" />,
      children: [
        {
          id: 1,
          title: t(pathTitleMap["roles"]),
          link: paths.roles.root,
          isShow: true,
        },
        {
          id: 2,
          title: t(pathTitleMap["supervisors"]),
          link: paths.supervisors.root,
          isShow: true,
        },
      ],
      isShow: isAdmin,
    },

    {
      id: 13,
      title: t(pathTitleMap["notFound"]),
      link: paths.notFound,
      icon: <TbError404 className="text-2xl" />,
      isShow: true,
    },
    {
      id: 14,
      title: t(pathTitleMap["error"]),
      link: paths.error,
      icon: <BiSolidError className="text-2xl" />,
      isShow: true,
    },
  ];

  return links;
};

export default useAsideLinks;
