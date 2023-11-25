import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { TitledModal, TitledModalProps } from './titledModal';

const meta: Meta<typeof TitledModal> = {
  component: TitledModal,
};
export default meta;

type Story = StoryObj<typeof TitledModal>;

export const Primary: Story = {
  args: {
    title: 'hoge',
    open: true,
    children: <div>fuga piyo</div>,
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs<TitledModalProps>();
    const handleOpen = () => {
      updateArgs({ open: !open });
    };

    return (
      <div>
        <button
          type="button"
          className="text-primary"
          onClick={handleOpen}
        >
          OPEN MODAL
        </button>
        <TitledModal
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          open={open}
          onClose={() => {
            handleOpen();
            action('close')();
          }}
        />
      </div>
    );
  },
};
