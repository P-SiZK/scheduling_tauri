import { Calendar as CalendarComponent } from './components/calendar';
import useCalendar from './hooks/useCalendar';
import { UserID } from './types';

export type CalendarProps = {
  userId: UserID;
};

export function Calendar({ userId }: CalendarProps) {
  const { shiftDates, shiftTypes, upsertShiftDate, deleteShiftDate } =
    useCalendar({ userId });

  return (
    <CalendarComponent
      shiftDates={shiftDates}
      shiftTypes={shiftTypes}
      handleUpsertShiftDate={upsertShiftDate}
      handleDeleteShiftDate={deleteShiftDate}
    />
  );
}
