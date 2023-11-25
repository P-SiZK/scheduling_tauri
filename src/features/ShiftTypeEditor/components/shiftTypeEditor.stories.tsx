import { useArgs, useState } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import {
  ShiftTypeEditor,
  ShiftTypeEditorProps,
} from './shiftTypeEditor';

const meta: Meta<typeof ShiftTypeEditor> = {
  component: ShiftTypeEditor,
};
export default meta;

type Story = StoryObj<typeof ShiftTypeEditor>;

export const Primary: Story = {
  args: {
    shiftTypes: [],
  },
  render: function Render(args) {
    const [shiftTypeId, setShiftTypeId] = useState(1);
    const [
      {
        shiftTypes,
        handleInsertShiftType,
        handleUpdateShiftType,
        handleDeleteShiftType,
      },
      updateArgs,
    ] = useArgs<ShiftTypeEditorProps>();

    const insertShiftType: typeof handleInsertShiftType = (
      name,
      color
    ) => {
      const shifts = shiftTypes.slice();
      shifts.push({
        id: shiftTypeId.toString(),
        name,
        color,
      });
      updateArgs({ shiftTypes: shifts });
      setShiftTypeId((id) => id + 1);
    };

    const updateShiftType: typeof handleUpdateShiftType = (
      id,
      name,
      color
    ) => {
      const index = shiftTypes.findIndex(
        ({ id: stid }) => id === stid
      );
      if (index === -1) return;
      const updatedShiftTypes = shiftTypes.slice();
      updatedShiftTypes[index].name = name;
      updatedShiftTypes[index].color = color;
      updateArgs({
        shiftTypes: updatedShiftTypes,
      });
    };

    const deleteShiftType: typeof handleDeleteShiftType = (id) => {
      updateArgs({
        shiftTypes: shiftTypes.filter(({ id: stid }) => id !== stid),
      });
    };

    return (
      <ShiftTypeEditor
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        handleInsertShiftType={insertShiftType}
        handleUpdateShiftType={updateShiftType}
        handleDeleteShiftType={deleteShiftType}
      />
    );
  },
};
