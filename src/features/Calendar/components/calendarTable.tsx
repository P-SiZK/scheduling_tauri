import { DeletableChip } from '@/components/ui/DeletableChip';
import { dayColor } from '@/utils/dayColor';
import { getDate, isSameDay, isSameMonth } from 'date-fns';
import getCalendarMatrix from '../lib/getCalendarMatrix';
import { ShiftDates, ShiftType, ShiftTypes } from '../types';

export type CalendarTableProps = {
  date: Date;
  shiftDates: ShiftDates;
  shiftTypes: ShiftTypes;
  handleClickShiftDate: (date: Date) => void;
  handleDeleteShiftDate: (date: Date) => void;
};

export function CalendarTable({
  date,
  shiftDates,
  shiftTypes,
  handleClickShiftDate,
  handleDeleteShiftDate,
}: CalendarTableProps) {
  const calendarMatrix = getCalendarMatrix(date);

  return (
    <table className="table table-pin-rows table-fixed border-collapse border-slate-500 [&_td]:p-0">
      <thead>
        <tr className="h-10">
          {calendarMatrix[0].calendarRow.map(
            ({ id, calendarDate }) => (
              <th
                key={id}
                className={`${dayColor(
                  calendarDate
                )} border text-center`}
              >
                {calendarDate.toLocaleDateString(undefined, {
                  weekday: 'short',
                })}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {calendarMatrix.map(({ id: rowId, calendarRow }) => (
          <tr key={rowId}>
            {calendarRow.map(({ id: cellId, calendarDate }) => {
              let shiftType: ShiftType | undefined;
              const shiftDate = shiftDates.find(({ date: d }) =>
                isSameDay(calendarDate, d)
              );
              if (shiftDate !== undefined) {
                shiftType = shiftTypes.find(
                  ({ id }) => id === shiftDate.shiftTypeId
                );
              }
              const opacity = isSameMonth(calendarDate, date)
                ? ''
                : 'opacity-40';
              return (
                <td key={cellId} className={`h-16 border ${opacity}`}>
                  {shiftType ? (
                    <div className="flex h-full w-full flex-col items-center p-1">
                      <div>{getDate(calendarDate)}</div>
                      <DeletableChip
                        label={shiftType.name}
                        colorCode={shiftType.color}
                        widthClass="w-full"
                        onClick={() => {
                          handleClickShiftDate(calendarDate);
                        }}
                        onDelete={() => {
                          handleDeleteShiftDate(calendarDate);
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="flex h-full w-full flex-col items-center p-1"
                      onClick={() => {
                        handleClickShiftDate(calendarDate);
                      }}
                    >
                      <div>{getDate(calendarDate)}</div>
                    </button>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
