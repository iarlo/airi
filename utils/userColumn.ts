import { User } from '@src/database/main';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User & { agent_name: string | null }>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'agent_name',
    header: 'Agente',
  },
];
