import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from 'date-fns';

export default function getDateList(date: Date) {
  const dateList = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  }).map((d) => ({
    id: d.toDateString(),
    date: d,
  }));

  return dateList;
}
