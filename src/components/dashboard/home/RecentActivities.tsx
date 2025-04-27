// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import BoxHeader from "@components/common/box/BoxHeader";
import TimeLine from "@components/common/timeLine/TimeLine";
// Icons
import { GrTransaction } from "react-icons/gr";

const RecentActivities = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <div className="bg-box-bg max-6xl:w-full w-1/2 p-4">
      <BoxHeader
        title={t("home.recentActivities")}
        icon={<GrTransaction className="text-heading text-2xl" />}
      />
      <div className="space-y-4 p-2">
        <TimeLine
          title="Title"
          time={"03:15 PM"}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam adipisci, explicabo atque assumenda."
        />
        <TimeLine
          title="Title"
          time={"03:15 PM"}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam adipisci, explicabo atque assumenda."
        />
      </div>
    </div>
  );
};

export default RecentActivities;
