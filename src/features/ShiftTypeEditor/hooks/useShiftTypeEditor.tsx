import { useCallback } from 'react';
import useDeleteShiftType from '../api/deleteShiftType';
import useGetShiftTypes from '../api/getShiftTypes';
import useInsertShiftType from '../api/insertShiftType';
import useUpdateShiftType from '../api/updateShiftType';
import { ShiftType } from '../types';

export default function useShiftTypeEditor() {
  const { data: shiftTypes = [] } = useGetShiftTypes();
  const { mutate: insertMutate } = useInsertShiftType();
  const { mutate: updateMutate } = useUpdateShiftType();
  const { mutate: deleteMutate } = useDeleteShiftType();

  const insertShiftType = useCallback(
    (name: ShiftType['name'], color: ShiftType['color']) => {
      insertMutate({ name, color });
    },
    [insertMutate]
  );

  const updateShiftType = useCallback(
    (
      id: ShiftType['id'],
      name: ShiftType['name'],
      color: ShiftType['color']
    ) => {
      updateMutate({
        id,
        name,
        color,
      });
    },
    [updateMutate]
  );

  const deleteShiftType = useCallback(
    (id: ShiftType['id']) => {
      deleteMutate({ id });
    },
    [deleteMutate]
  );

  return {
    shiftTypes,
    insertShiftType,
    updateShiftType,
    deleteShiftType,
  };
}
