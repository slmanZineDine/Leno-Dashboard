// ################### Table Header ###################
export type TTableHeader = {
  id: number;
  title: string;
  isShow: boolean;
  styling?: { [key: string]: string };
};

// ################### Calendar ###################
export type TCalendar = {
  // days?: { id: string; title: number }[];
  weeks: { id: string; title: number; name: string }[][];
};
export type TCalendarView = "month" | "weeks" | "day";
