import { useArgs, useState } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { UserEditor, UserEditorProps } from './userEditor';

const meta: Meta<typeof UserEditor> = {
  component: UserEditor,
};
export default meta;

type Story = StoryObj<typeof UserEditor>;

export const Primary: Story = {
  args: {
    users: [],
  },
  render: function Render(args) {
    const [userId, setUserId] = useState(1);
    const [
      { users, handleInsertUser, handleUpdateUser, handleDeleteUser },
      updateArgs,
    ] = useArgs<UserEditorProps>();

    const insertUser: typeof handleInsertUser = (name) => {
      const us = users.slice();
      us.push({
        id: userId.toString(),
        name,
      });
      updateArgs({ users: us });
      setUserId((id) => id + 1);
    };

    const updateUser: typeof handleUpdateUser = (id, name) => {
      const index = users.findIndex(({ id: uid }) => id === uid);
      if (index === -1) return;
      const updatedUsers = users.slice();
      updatedUsers[index].name = name;
      updateArgs({
        users: updatedUsers,
      });
    };

    const deleteUser: typeof handleDeleteUser = (id) => {
      updateArgs({
        users: users.filter(({ id: uid }) => id !== uid),
      });
    };

    return (
      <UserEditor
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        handleInsertUser={insertUser}
        handleUpdateUser={updateUser}
        handleDeleteUser={deleteUser}
      />
    );
  },
};
