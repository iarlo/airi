import i18n from '@config/i18n/main';
import { User } from '@src/database/main';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User & { agent_name: string | null }>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: i18n.t('table.user.columns.name'),
  },
  {
    accessorKey: 'agent_name',
    header: i18n.t('table.user.columns.agent_name'),
  },
];
