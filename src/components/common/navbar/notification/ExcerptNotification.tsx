// My-Components
import TimeStamp from "@components/common/timeStamp/TimeStamp";
// Icons
import { RiNotification4Line } from "react-icons/ri";
// Utils
import convertGMTtoLocal from "@utils/time/convertGMTtoLocal";
// Types
import type { TNotification } from "@customTypes/notification/notification";

const ExcerptNotification = ({ title, body, created_at }: TNotification) => {
  // ################### CONTENT ###################
  const content = (
    <div className="w-full">
      <header className="flex-between gap-2">
        <h3>{title}</h3>
        <TimeStamp
          timestamp={convertGMTtoLocal(created_at ?? "", "datetime")}
          className="text-xs"
        />
      </header>
      <p className="text-sm">{body}</p>
    </div>
  );

  return (
    <div className="flex items-start gap-3">
      <div className="flex-center bg-hover size-10 shrink-0 rounded-lg text-2xl">
        {<RiNotification4Line className="text-xl" />}
      </div>
      {content}
    </div>
  );
};

export default ExcerptNotification;
