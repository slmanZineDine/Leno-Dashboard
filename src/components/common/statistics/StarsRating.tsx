// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Icons
import { TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";
// Enums
import { Directions } from "constants/enums";

type TStarsRatingProps = {
  rating: number;
};

const StarsRating = ({ rating }: TStarsRatingProps) => {
  // ################### LOCALES ###################
  const {
    i18n: { dir, language },
  } = useTranslation();

  // ################### HANDLER ###################
  const stars = Array.from({ length: 5 }, (_, i) => {
    const index = i + 1;

    if (index <= Math.floor(rating)) return <TbStarFilled />;
    else if (Math.ceil(rating) === index && rating % 1 > 0.4)
      return (
        <TbStarHalfFilled
          className={dir(language) === Directions.RTL ? "-scale-x-100" : ""}
        />
      );
    else return <TbStar />;
  });

  return (
    <ul className="flex items-center text-2xl text-yellow-500">
      {stars.map((star, index) => (
        <li key={index}>{star}</li>
      ))}
    </ul>
  );
};

export default StarsRating;
