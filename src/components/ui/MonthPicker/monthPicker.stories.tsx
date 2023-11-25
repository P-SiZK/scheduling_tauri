import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { MonthPicker, MonthPickerProps } from './monthPicker';

const today = new Date();

const meta: Meta<typeof MonthPicker> = {
  component: MonthPicker,
};
export default meta;

type Story = StoryObj<typeof MonthPicker>;

export const Primary: Story = {
  args: { date: today },
  argTypes: {
    date: { control: 'date' },
    handleDate: { control: false },
  },
  render: function Render(args) {
    const [{ date: d, handleDate }, updateArgs] =
      useArgs<MonthPickerProps>();
    const changeDate: typeof handleDate = (date) => {
      if (date == null) return;
      updateArgs({ date });
    };

    return (
      <MonthPicker
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        date={typeof d === 'number' ? new Date(d) : d}
        handleDate={changeDate}
      />
    );
  },
};
