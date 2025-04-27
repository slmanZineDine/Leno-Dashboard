// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// Constants
import { DAYS } from "constants/dateData";

type TDayViewProps = {
  currentDayIndex: number;
};

const DayView = ({ currentDayIndex }: TDayViewProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      <table className="table-fixed border-spacing-1">
        <thead>
          <tr>
            <th>{t(`days.${DAYS[currentDayIndex].name}.name`)}</th>
          </tr>
        </thead>

        <tbody className="pt-4"></tbody>
      </table>
    </>
  );
};

export default DayView;
