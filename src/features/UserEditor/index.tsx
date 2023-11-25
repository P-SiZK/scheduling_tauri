import { UserEditor as UserEditorComponent } from './components/userEditor';
import useUserEditor from './hooks/useUserEditor';

export default function ShiftTypeEditor() {
  const { users, insertUser, updateUser, deleteUser } =
    useUserEditor();

  return (
    <UserEditorComponent
      users={users}
      handleInsertUser={insertUser}
      handleUpdateUser={updateUser}
      handleDeleteUser={deleteUser}
    />
  );
}
