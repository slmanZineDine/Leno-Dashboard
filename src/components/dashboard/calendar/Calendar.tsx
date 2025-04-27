// React
import { useEffect, useState } from "react";
// My-Components
import CalendarTitle from "./CalendarTitle";
import CalendarNavigator from "./CalendarNavigator";
import CalendarViewButtons from "./CalendarViewButtons";
// My-Hooks
import DayView from "@components/dashboard/calendar/views/DayView";
import WeekView from "@components/dashboard/calendar/views/WeekView";
import MonthView from "@components/dashboard/calendar/views/MonthView";
import useGenerateCalendar from "@hooks/calendar/useGenerateCalendar";
// Utils
import formatDate from "utils/time/formatDate";
// Types
import type { TCalendarView } from "@customTypes/common/global";

const Calendar = () => {
  // ################### REACT HOOKS ###################
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date())); // By Default Today
  const [view, setView] = useState<TCalendarView>("month");

  // ################### CUSTOM HOOKS ###################
  const {
    theDate,
    calendar,
    currentWeekIndex,
    setCurrentWeekIndex,
    currentDayIndex,
    setCurrentDayIndex,
    moveToNextMonth,
    moveToPrevMonth,
    moveToNextWeek,
    moveToPrevWeek,
    moveToNextDay,
    moveToPrevDay,
  } = useGenerateCalendar();

  // ################### HANDLER ###################
  const handleSelectDay = (
    date: string,
    dayIndex: number,
    weekIndex: number,
  ) => {
    setView("day");
    setSelectedDay(date);
    setCurrentDayIndex(dayIndex);
    setCurrentWeekIndex(weekIndex);
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (calendar.weeks.length > 0) {
      setSelectedDay(calendar.weeks[currentWeekIndex][currentDayIndex].id);
    }
  }, [currentDayIndex]);

  if (calendar?.weeks) {
    return (
      <>
        <div className="flex-between max-3xl:flex-col mb-4 gap-1 font-bold text-black">
          <CalendarNavigator
            view={view}
            moveToNextMonth={moveToNextMonth}
            moveToNextWeek={moveToNextWeek}
            moveToNextDay={moveToNextDay}
            moveToPrevMonth={moveToPrevMonth}
            moveToPrevWeek={moveToPrevWeek}
            moveToPrevDay={moveToPrevDay}
          />
          <CalendarTitle
            view={view}
            calendar={calendar}
            theDate={theDate}
            selectedDay={selectedDay}
            currentWeekIndex={currentWeekIndex}
            currentDayIndex={currentDayIndex}
          />
          <CalendarViewButtons view={view} setView={setView} />
        </div>

        {view === "month" && (
          <MonthView
            calendar={calendar}
            selectedDay={selectedDay}
            handleSelectDay={handleSelectDay}
          />
        )}
        {view === "weeks" && (
          <WeekView
            calendar={calendar}
            currentWeekIndex={currentWeekIndex}
            selectedDay={selectedDay}
            handleSelectDay={handleSelectDay}
          />
        )}
        {view === "day" && <DayView currentDayIndex={currentDayIndex} />}
      </>
    );
  }
};

export default Calendar;
