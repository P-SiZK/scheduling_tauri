import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { DeletableChip } from './deletableChip';

const meta: Meta<typeof DeletableChip> = {
  component: DeletableChip,
};
export default meta;

type Story = StoryObj<typeof DeletableChip>;

export const Primary: Story = {
  args: {
    label: 'test',
    colorCode: '#e91010',
    widthClass: 'w-24',
    onClick: () => {
      action('click')();
    },
    onDelete: () => {
      action('delete')();
    },
  },
  argTypes: {
    colorCode: { control: 'color' },
  },
};
