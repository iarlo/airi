import { DataTable as DataTableComponent } from '@components/DataTable';
import { Meta, StoryObj } from '@storybook/react';
import { columns } from '@utils/userColumn';

//meta
const meta = {
  title: 'Shadcn/data-table',
  component: DataTableComponent,
  parameters: {
    addPath: '/',
    columns: columns,
    data: [
      { id: 1, name: 'Alice', agent_name: 'John Doe' },
      { id: 2, name: 'Bob', agent_name: 'Jane Doe' },
      { id: 3, name: 'Charlie', agent_name: null },
    ],
    rowCount: 3,
    paginationState: { pageIndex: 0, pageSize: 10 },
    onPaginationChange: () => {},
  },
} satisfies Meta<typeof DataTableComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { id: 1, name: 'Alice', agent_name: 'John Doe' },
      { id: 2, name: 'Bob', agent_name: 'Jane Doe' },
      { id: 3, name: 'Charlie', agent_name: null },
    ],
  },
};
