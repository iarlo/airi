import { Button } from '@components/Button';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shadcn/button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'ghost', 'link', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'icon', 'sm', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const buttonLabel = 'Buttton Label';

export const Default: Story = {
  args: {
    variant: 'default',
    children: buttonLabel,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: buttonLabel,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: buttonLabel,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: buttonLabel,
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: buttonLabel,
  },
};
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: buttonLabel,
  },
};

export const SizeDefault: Story = {
  args: {
    size: 'default',
    children: buttonLabel,
  },
};
export const SizeIcon: Story = {
  args: {
    size: 'icon',
    children: 'ICO',
  },
};
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    children: buttonLabel,
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    children: buttonLabel,
  },
};
