import { DeletableChip } from '@/components/ui/DeletableChip';
import { dayColor } from '@/utils/dayColor';
import { isSameDay } from 'date-fns';
import getDateList from '../lib/getDateList';
import { ShiftTypes, Users } from '../types';

export type SchedulerTableProps = {
  date: Date;
  users: Users;
  shiftTypes: ShiftTypes;
};

export function SchedulerTable({
  date,
  users,
  shiftTypes,
}: SchedulerTableProps) {
  const dateList = getDateList(date);

  return (
    <div className=" max-h-fit overflow-auto">
      <table className="table table-pin-rows table-pin-cols table-fixed [&_td]:p-1 [&_th]:p-1">
        <thead>
          <tr className="h-10">
            <th className="w-36 border text-center">名前</th>
            {dateList.map(({ id, date: scheduledDate }) => {
              const color = dayColor(scheduledDate);
              return (
                <td
                  key={id}
                  className={`w-24 border text-center ${color}`}
                >
                  {scheduledDate.toLocaleDateString(undefined, {
                    day: '2-digit',
                    weekday: 'short',
                  })}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id: userId, name, shiftDates: shifts }) => (
            <tr key={userId} className="h-12">
              <th className="truncate border">{name}</th>
              {dateList.map(({ id, date: scheduledDate }) => {
                const shiftTypeId = shifts.find(({ date: d }) =>
                  isSameDay(scheduledDate, d)
                )?.shiftTypeId;
                const shiftType = shiftTypes.find(
                  ({ id: stid }) => shiftTypeId === stid
                );
                return (
                  <td key={id} className="border">
                    {shiftType && (
                      <DeletableChip
                        label={shiftType.name}
                        colorCode={shiftType.color}
                        widthClass="w-full"
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
