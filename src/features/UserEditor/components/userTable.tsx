import {
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { User, Users } from '../types';

export type UserTableProps = {
  users: Users;
  handleClickUser: (id: User['id']) => void;
  handleDeleteUser: (id: User['id']) => void;
};

export function UserTable({
  users,
  handleClickUser,
  handleDeleteUser,
}: UserTableProps) {
  return (
    <table className="table table-pin-rows table-fixed">
      <thead>
        <tr className="h-10">
          <th className="w-52 text-center">名前</th>
          <th className="w-16 text-center">編集</th>
          <th className="w-16 text-center">削除</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="h-12">
            <td className="truncate text-center">{user.name}</td>
            <td className="text-center">
              <button
                type="button"
                className="btn btn-circle btn-ghost"
              >
                <PencilSquareIcon
                  className="h-5 w-5"
                  onClick={() => {
                    handleClickUser(user.id);
                  }}
                />
              </button>
            </td>
            <td className="text-center">
              <button
                type="button"
                className="btn btn-circle btn-ghost"
              >
                <TrashIcon
                  className="h-5 w-5"
                  onClick={() => {
                    handleDeleteUser(user.id);
                  }}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
