import { useCallback } from 'react';
import useDeleteShiftDate from '../api/deleteShiftDate';
import useGetShiftDates from '../api/getShiftDates';
import useGetShiftTypes from '../api/getShiftTypes';
import useUpsertShiftDate from '../api/upsertShiftDate';
import { ShiftDates, ShiftType, UserID } from '../types';

type UseCalendarOptions = {
  userId: UserID;
};

export default function useCalendar({ userId }: UseCalendarOptions) {
  const { data: shiftTypes = [] } = useGetShiftTypes();
  const { data: shiftDatesData = [] } = useGetShiftDates({ userId });
  const { mutate: upsertMutate } = useUpsertShiftDate();
  const { mutate: deleteMutate } = useDeleteShiftDate();

  const shiftDates: ShiftDates = shiftDatesData.map((shiftDate) => ({
    id: shiftDate.id,
    shiftTypeId: shiftDate.shiftTypeId,
    date: new Date(
      shiftDate.year,
      shiftDate.month - 1,
      shiftDate.day
    ),
  }));

  const upsertShiftDate = useCallback(
    (date: Date, shiftTypeId: ShiftType['id']) => {
      upsertMutate({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        user_id: userId,
        shift_type_id: shiftTypeId,
      });
    },
    [upsertMutate, userId]
  );

  const deleteShiftDate = useCallback(
    (date: Date) => {
      deleteMutate({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        user_id: userId,
      });
    },
    [deleteMutate, userId]
  );

  return { shiftDates, shiftTypes, upsertShiftDate, deleteShiftDate };
}
