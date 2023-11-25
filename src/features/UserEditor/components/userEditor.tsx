import { TitledModal } from '@/components/ui/TitledModal';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { User, Users } from '../types';
import { RegisterUser } from './registerUser';
import { UserTable } from './userTable';

export type UserEditorProps = {
  users: Users;
  handleInsertUser: (name: User['name']) => void;
  handleUpdateUser: (id: User['id'], name: User['name']) => void;
  handleDeleteUser: (id: User['id']) => void;
};

export function UserEditor({
  users,
  handleInsertUser,
  handleUpdateUser,
  handleDeleteUser,
}: UserEditorProps) {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState<User['id'] | undefined>(
    undefined
  );

  const handleClickUser = (id: User['id']) => {
    setUserId(id);
    setOpenModal(true);
  };

  const handleRegister = (name: User['name']) => {
    if (typeof userId === 'undefined') {
      handleInsertUser(name);
    } else {
      handleUpdateUser(userId, name);
    }
    setOpenModal(false);
  };

  return (
    <div>
      <UserTable
        users={users}
        handleClickUser={handleClickUser}
        handleDeleteUser={handleDeleteUser}
      />
      <div className="mt-1 text-center">
        <button
          type="button"
          className="btn btn-sm h-8"
          onClick={() => {
            setUserId(undefined);
            setOpenModal(true);
          }}
        >
          <PlusIcon className="h-4 w-4" />
          追加
        </button>
      </div>
      <TitledModal
        title="ユーザーの編集"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <RegisterUser
          handleRegister={handleRegister}
          editValues={users.find(({ id }) => userId === id)}
        />
      </TitledModal>
    </div>
  );
}
