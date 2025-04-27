// React
import { useEffect, useState } from "react";
// Types
import type { TCalendar } from "@customTypes/common/global";

const useGenerateCalendar = () => {
  // ################### REACT HOOKS ###################
  const [theDate, setTheDate] = useState(new Date());
  const [calendar, setCalendar] = useState<TCalendar>({ weeks: [] });
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  // ################### HANDLER ###################
  function generateCalendar(year: number, month: number) {
    const daysCountInMonth = (year: number, month: number): number =>
      new Date(year, month + 1, 0).getDate();

    const daysCountThisMonth = daysCountInMonth(year, month);
    const firstDayThisMonth = new Date(year, month, 1).getDay();

    // const days = [];
    const weeks = [];
    let currentWeek = [];

    // Pad days from last month
    for (let i = firstDayThisMonth; i > 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const day = daysCountInMonth(prevYear, prevMonth) - i + 1;

      // days.push({
      //   id: `${prevYear}-${prevMonth + 1}-${day}`,
      //   title: day,
      // });
      currentWeek.push({
        id: `${prevYear}-${(prevMonth + 1).toString().padStart(2, "0")}-${day}`,
        title: day,
        name: `${prevMonth + 1}/${day}`,
      });
    }

    // Generate days for this month
    for (let i = 1; i <= daysCountThisMonth; i++) {
      const day = String(i).padStart(2, "0");

      // days.push({
      //   id: `${year}-${month + 1}-${day}`,
      //   title: i,
      // });
      currentWeek.push({
        id: `${year}-${(month + 1).toString().padStart(2, "0")}-${day}`,
        title: i,
        name: `${month + 1}/${i}`,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Pad days from next month
    const lastDayThisMonth = new Date(year, month, daysCountThisMonth).getDay();
    for (let i = 1; i <= 6 - lastDayThisMonth; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const day = String(i).padStart(2, "0");

      // days.push({
      //   id: `${nextYear}-${nextMonth + 1}-${day}`,
      //   title: i,
      // });
      currentWeek.push({
        id: `${nextYear}-${(nextMonth + 1).toString().padStart(2, "0")}-${day}`,
        title: i,
        name: `${nextMonth + 1}/${i}`,
      });
    }

    // Add the last week
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return {
      // days,
      weeks,
    };
  }

  function moveToNextMonth(resetType = "month") {
    const newDate = new Date(theDate.getFullYear(), theDate.getMonth() + 1);
    setTheDate(newDate);

    const calendar = generateCalendar(
      newDate.getFullYear(),
      newDate.getMonth(),
    );
    setCalendar(calendar);

    if (resetType === "month") {
      // Reset Weeks To The First Week Of The Month
      setCurrentWeekIndex(0);

      // Get Index Of The First Day Of The Month
      calendar.weeks[0].some((day, dayIndex) => {
        if (day.title === 1) {
          setCurrentDayIndex(dayIndex);
          return true;
        }
        return false;
      });
    } else if (resetType === "week") {
      if (
        calendar.weeks[0].find((day) => day.title === 1) &&
        calendar.weeks[0][0].title !== 1
      ) {
        setCurrentWeekIndex(1);
      } else {
        setCurrentWeekIndex(0);
      }

      setCurrentDayIndex(0);
    }
  }
  function moveToPrevMonth(resetType = "month") {
    const newDate = new Date(theDate.getFullYear(), theDate.getMonth() - 1);
    setTheDate(newDate);

    const calendar = generateCalendar(
      newDate.getFullYear(),
      newDate.getMonth(),
    );
    setCalendar(calendar);

    if (resetType === "month") {
      // Reset Weeks To The First Week Of The Month
      setCurrentWeekIndex(0);

      // Get Index Of The First Day Of The Month
      calendar.weeks[0].some((day, dayIndex) => {
        if (day.title === 1) {
          setCurrentDayIndex(dayIndex);
          return true;
        }
        return false;
      });
    } else if (resetType === "week") {
      if (
        calendar.weeks[calendar.weeks.length - 1].find((day) => day.title === 1)
      ) {
        setCurrentWeekIndex(calendar.weeks.length - 2);
      } else {
        setCurrentWeekIndex(calendar.weeks.length - 1);
      }

      setCurrentDayIndex(0);
    }
  }

  function moveToNextWeek() {
    if (calendar.weeks) {
      const weeksCount = calendar.weeks.length;
      const newIndex = currentWeekIndex + 1;
      if (weeksCount <= newIndex) {
        moveToNextMonth("week");
      } else {
        setCurrentWeekIndex(newIndex);
        setCurrentDayIndex(0);
      }
    }
  }
  function moveToPrevWeek() {
    const newIndex = currentWeekIndex - 1;
    if (0 > newIndex) {
      moveToPrevMonth("week");
    } else {
      setCurrentWeekIndex(newIndex);
      setCurrentDayIndex(0);
    }
  }

  function moveToNextDay() {
    const newIndex = currentDayIndex + 1;

    if (6 < newIndex) {
      moveToNextWeek();
    } else {
      setCurrentDayIndex(newIndex);
    }
  }
  function moveToPrevDay() {
    const newIndex = currentDayIndex - 1;

    if (0 > newIndex) {
      moveToPrevWeek();
      setCurrentDayIndex(6);
    } else {
      setCurrentDayIndex(newIndex);
    }
  }

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const calendar = generateCalendar(
      theDate.getFullYear(),
      theDate.getMonth(),
    );

    let defaultWeekIndex: number | undefined;
    let defaultDayIndex: number | undefined;

    calendar.weeks.some((week, weekIndex) => {
      week.findIndex((day, dayIndex) => {
        if (day.title === theDate.getDate()) {
          defaultWeekIndex = weekIndex;
          defaultDayIndex = dayIndex;
          return true;
        }
        return false;
      });
      return typeof defaultWeekIndex === "undefined" ? false : true;
    });

    setCurrentWeekIndex(defaultWeekIndex ?? 0);
    setCurrentDayIndex(defaultDayIndex ?? 0);

    setCalendar(calendar);
  }, []);

  return {
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
  };
};

export default useGenerateCalendar;
