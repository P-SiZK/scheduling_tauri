import { MonthPicker } from '@/components/ui/MonthPicker';
import { ShiftTypes, Users } from '../types';
import { SchedulerTable } from './schedulerTable';

export type SchedulerProps = {
  date: Date;
  handleDate: (date: Date) => void;
  users: Users;
  shiftTypes: ShiftTypes;
};

export function Scheduler({
  date,
  handleDate,
  users,
  shiftTypes,
}: SchedulerProps) {
  return (
    <div>
      <MonthPicker date={date} handleDate={handleDate} />
      <SchedulerTable
        date={date}
        users={users}
        shiftTypes={shiftTypes}
      />
    </div>
  );
}
