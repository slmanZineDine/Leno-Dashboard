import { useTranslation } from "react-i18next";
// React
import { useEffect, useState } from "react";
// My-Components
import StarsRating from "@components/common/statistics/StarsRating";
import StarLine from "@components/dashboard/statistics/ratings/StarLine";
// Utils
import calculateAverageRating from "@utils/global/calculateAverageRating";

type TVotes = {
  [key: number]: number;
};
const initialVotes: TVotes = { 1: 25, 2: 35, 3: 70, 4: 95, 5: 65 };

const RatingsStatistics = () => {
  const { t } = useTranslation();

  // ################### REACT HOOKS ###################
  const [averageRating, setAverageRating] = useState(0);
  const [totalVotes, setTotalVotes] = useState(190);

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const { totalVotes, averageRating } = calculateAverageRating(initialVotes);

    setTotalVotes(totalVotes);
    setAverageRating(isNaN(averageRating) ? 0 : averageRating);
  }, []);

  return (
    <div className="bg-box-bg 6xl:w-[350px] w-full rounded-xl p-4">
      <h2 className="text-heading mb-4 text-xl font-bold">
        {t("statistics.sections.ratings.title")}
      </h2>
      <div className="flex-between mb-4">
        <span className="text-heading text-2xl font-extrabold">
          {averageRating} <sub>/5</sub>
        </span>
        <StarsRating rating={averageRating} />
      </div>
      <ul>
        {Array.from({ length: 5 }, (_, i) => {
          const index = 5 - i;

          return (
            <StarLine
              key={i}
              stars={index}
              value={initialVotes[index] / totalVotes}
              votes={initialVotes[index]}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default RatingsStatistics;
