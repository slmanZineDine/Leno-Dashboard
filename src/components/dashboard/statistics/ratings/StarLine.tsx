// Icons
import { TbStarFilled } from "react-icons/tb";

type TStarLineProps = {
  stars: number;
  value: number;
  votes: number;
};

const StarLine = ({ stars, value, votes }: TStarLineProps) => {
  return (
    <li className="flex items-center gap-2">
      <span className="flex items-center gap-1">
        {stars} <TbStarFilled className="text-yellow-500" />
      </span>
      <progress
        className="progress progress-info max-cmd:w-48 w-56 shrink-0"
        value={isNaN(value) ? 0 : value * 100}
        max="100"
      ></progress>
      <span className="text-content">{votes}</span>
    </li>
  );
};

export default StarLine;
