import { useArgs, useState } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { isSameDay } from 'date-fns';
import { ShiftTypes } from '../types';
import { Calendar, CalendarProps } from './calendar';

const testShiftTypes: ShiftTypes = [
  { id: '1', name: 'foo', color: '#ff3300' },
  { id: '2', name: 'bar', color: '#0022ff' },
];

const meta: Meta<typeof Calendar> = {
  component: Calendar,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  args: {
    shiftDates: [],
    shiftTypes: testShiftTypes,
  },
  argTypes: {
    handleUpsertShiftDate: { control: false },
    handleDeleteShiftDate: { control: false },
  },
  render: function Render(args) {
    const [shiftDateId, setShiftDateId] = useState(1);
    const [
      { shiftDates, handleUpsertShiftDate, handleDeleteShiftDate },
      updateArgs,
    ] = useArgs<CalendarProps>();

    const upsertShiftDate: typeof handleUpsertShiftDate = (
      date,
      shiftTypeId
    ) => {
      const upsertedShiftDates = shiftDates.slice();
      const index = upsertedShiftDates.findIndex(({ date: d }) =>
        isSameDay(date, d)
      );
      if (index === -1) {
        upsertedShiftDates.push({
          id: shiftDateId.toString(),
          date,
          shiftTypeId,
        });
        setShiftDateId((id) => id + 1);
      } else {
        upsertedShiftDates[index].shiftTypeId = shiftTypeId;
      }
      updateArgs({ shiftDates: upsertedShiftDates });
    };

    const deleteShiftDate: typeof handleDeleteShiftDate = (date) => {
      updateArgs({
        shiftDates: shiftDates.filter(
          ({ date: d }) => !isSameDay(date, d)
        ),
      });
    };

    return (
      <Calendar
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        shiftDates={shiftDates}
        handleUpsertShiftDate={upsertShiftDate}
        handleDeleteShiftDate={deleteShiftDate}
      />
    );
  },
};
