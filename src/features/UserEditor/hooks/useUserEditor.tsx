import { useCallback } from 'react';
import useDeleteUser from '../api/deleteUser';
import useGetUsers from '../api/getUsers';
import useInsertUser from '../api/insertUser';
import useUpdateUser from '../api/updateUser';
import { User } from '../types';

export default function useUserEditor() {
  const { data: users = [] } = useGetUsers();
  const { mutate: insertMutate } = useInsertUser();
  const { mutate: updateMutate } = useUpdateUser();
  const { mutate: deleteMutate } = useDeleteUser();

  const insertUser = useCallback(
    (name: User['name']) => {
      insertMutate({ name });
    },
    [insertMutate]
  );

  const updateUser = useCallback(
    (id: User['id'], name: User['name']) => {
      updateMutate({
        id,
        name,
      });
    },
    [updateMutate]
  );

  const deleteUser = useCallback(
    (id: User['id']) => {
      deleteMutate({ id });
    },
    [deleteMutate]
  );

  return {
    users,
    insertUser,
    updateUser,
    deleteUser,
  };
}
