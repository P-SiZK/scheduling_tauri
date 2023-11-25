import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { addDays, startOfMonth } from 'date-fns';
import { ShiftDates, ShiftTypes, Users } from '../types';
import { Scheduler, SchedulerProps } from './scheduler';

const today = new Date();

const testShiftDates: ShiftDates[] = [
  [
    {
      id: '1',
      date: today,
      shiftTypeId: '4',
    },
    {
      id: '2',
      date: addDays(today, 1),
      shiftTypeId: '1',
    },
    {
      id: '3',
      date: addDays(startOfMonth(today), 3),
      shiftTypeId: '2',
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [
    {
      id: '4',
      date: addDays(today, 6),
      shiftTypeId: '3',
    },
  ],
];
const testUsers: Users = [
  { id: '1', name: 'hoge', shiftDates: testShiftDates[0] },
  { id: '2', name: 'fuga', shiftDates: testShiftDates[1] },
  { id: '3', name: 'piyo', shiftDates: testShiftDates[2] },
  { id: '4', name: 'foo', shiftDates: testShiftDates[3] },
  { id: '5', name: 'bar', shiftDates: testShiftDates[4] },
  { id: '6', name: 'baz', shiftDates: testShiftDates[5] },
  {
    id: '7',
    name: 'x'.repeat(30),
    shiftDates: testShiftDates[6],
  },
  { id: '8', name: 'one', shiftDates: testShiftDates[7] },
  { id: '9', name: 'two', shiftDates: testShiftDates[8] },
];
const testShiftTypes: ShiftTypes = [
  { id: '1', name: 'foo', color: '#0088ff' },
  { id: '2', name: 'bar', color: '#aa00ff' },
  { id: '3', name: 'hoge fuga', color: '#4400ff' },
  {
    id: '4',
    name: 'foo bar baz hoge fuga',
    color: '#0011ff',
  },
];

const meta: Meta<typeof Scheduler> = {
  component: Scheduler,
};
export default meta;

type Story = StoryObj<typeof Scheduler>;

export const Primary: Story = {
  args: {
    date: today,
    shiftTypes: testShiftTypes,
    users: testUsers,
  },
  argTypes: {
    date: { control: 'date' },
    handleDate: { control: false },
  },
  render: function Render(args) {
    const [{ date, handleDate }, updateArgs] =
      useArgs<SchedulerProps>();

    const updateDate: typeof handleDate = (d) => {
      updateArgs({ date: d });
    };

    return (
      <Scheduler
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        date={typeof date === 'number' ? new Date(date) : date}
        handleDate={updateDate}
      />
    );
  },
};
