import useGetShiftTypes from '../api/getShiftTypes';
import useGetUsers from '../api/getUsers';
import { Users } from '../types';

export default function useScheduler() {
  const { data: usersData = [] } = useGetUsers();
  const { data: shiftTypes = [] } = useGetShiftTypes();

  const users: Users = usersData.map((user) => ({
    id: user.id,
    name: user.name,
    shiftDates: user.shiftDates.map((shiftDate) => ({
      id: shiftDate.id,
      shiftTypeId: shiftDate.shiftTypeId,
      date: new Date(
        shiftDate.year,
        shiftDate.month - 1,
        shiftDate.day
      ),
    })),
  }));

  return { users, shiftTypes };
}
