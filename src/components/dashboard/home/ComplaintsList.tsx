// Third-Party =====> react-router-dom
import { Link } from "react-router-dom";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import BoxHeader from "@components/common/box/BoxHeader";
import CustomList from "@components/common/list/CustomList";
import TimeLine from "@components/common/timeLine/TimeLine";
// Icons
import { AiFillAlert } from "react-icons/ai";
// utils
import formatTime from "@utils/time/formatTime";
// Data
import { paths } from "@routes/paths";
import { COMPLAINTS } from "@data/index";

const ComplaintsList = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <div className="bg-box-bg 4xl:col-span-2 4xl:row-span-2 4xl:row-start-2 col-span-4 row-start-2 h-[496px] overflow-y-hidden rounded-2xl p-4">
      <BoxHeader
        title={t("home.complaints")}
        icon={
          <AiFillAlert
            className={`${COMPLAINTS?.length > 0 ? "animate-tada" : ""} text-heading text-2xl`}
          />
        }
      >
        <Link
          to={paths.complaints.root}
          className="text-md text-primary hover:underline dark:text-white"
        >
          {t("home.seeAll")}
        </Link>
      </BoxHeader>
      <div className="navbar-scroll max-clg:pb-20 h-[90%] space-y-4 overflow-x-hidden overflow-y-scroll px-1">
        <CustomList
          isLoading={false}
          noRecordMsg={t("home.noComplaints")}
          records={COMPLAINTS.slice(0, 5)}
          renderItem={(complaint) => (
            <TimeLine
              key={complaint?.id}
              title={complaint?.customer?.name}
              time={formatTime(complaint?.created_at)}
              text={complaint?.description}
              address={`${complaint?.location?.city?.name}, ${complaint?.location?.region?.name}`}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ComplaintsList;
