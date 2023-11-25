import {
  addWeeks,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  getMonth,
  getYear,
  startOfMonth,
} from 'date-fns';

export default function getCalendarMatrix(date: Date) {
  const beginingOfTheMonth = startOfMonth(date);

  const sundays = eachWeekOfInterval({
    start: beginingOfTheMonth,
    end: addWeeks(beginingOfTheMonth, 5),
  });

  const calendarMatrix = sundays.map((sunday, index) => ({
    id: `${getYear(date)} ${getMonth(date)} ${index + 1}`,
    calendarRow: eachDayOfInterval({
      start: sunday,
      end: endOfWeek(sunday),
    }).map((calendarDate) => ({
      id: calendarDate.toDateString(),
      calendarDate,
    })),
  }));

  return calendarMatrix;
}
