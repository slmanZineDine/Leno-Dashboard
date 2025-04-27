type TTimeLineProps = {
  className?: string;
  title: string;
  time: string;
  text: string;
  address?: string;
};

const TimeLine = ({
  title,
  time,
  text,
  className = "",
  address,
}: TTimeLineProps) => {
  return (
    <div
      className={`time-line before:border-[#9ca3af] after:border-[#f0f0f0] after:bg-[#9ca3af] ${className}`}
    >
      <div className="flex-between -ms-2 gap-2">
        <h2 className="flex-between text-text w-full gap-2 font-bold whitespace-nowrap">
          {title} <span className="h-px w-full bg-gray-400"></span>
        </h2>
        <time className="text-content w-28 text-sm whitespace-nowrap lg:w-24">
          {time}
        </time>
      </div>
      <p className="text-content mt-2">{text}</p>
      {address && (
        <address className="text-content text-md mt-auto">{address}</address>
      )}
    </div>
  );
};

export default TimeLine;
