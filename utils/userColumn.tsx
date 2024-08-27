import { Button } from '@components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/DropdownMenu';
import i18n from '@config/i18n/main';
import { User } from '@src/database/main';
import { UseMutationResult } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

import { formatDocument, formatPhone } from './format';

type Props = UseMutationResult<
  {
    id: string;
  },
  Error,
  number,
  unknown
>;

export const columns = (mut: Props): ColumnDef<User & { agent_name: string | null }>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: i18n.t('table.columns.name'),
  },
  {
    accessorKey: 'agent_name',
    header: i18n.t('table.columns.agent_name'),
  },
  {
    accessorKey: 'phone',
    header: i18n.t('table.columns.phone'),
    cell: ({ row }) => formatPhone(row.original.phone ?? ''),
  },
  {
    accessorKey: 'cns',
    header: i18n.t('table.columns.document'),
    cell: ({ row }) => formatDocument(row.original.cns ?? ''),
  },
  {
    accessorKey: 'address',
    header: i18n.t('table.columns.address'),
  },
  {
    accessorKey: 'birthdate',
    header: i18n.t('table.columns.birth'),
    cell: ({ row }) => format(new Date(row.original.birthdate as Date), 'dd/MM/yyyy'),
  },
  {
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{i18n.t('table.columns.actions')}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.name)}>
              {i18n.t('table.columns.copy', { field: i18n.t('table.columns.name').toLowerCase() })}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.cns ?? 'Sem documento')}>
              {i18n.t('table.columns.copy', { field: i18n.t('table.columns.document').toLowerCase() })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Link to={'/user/edit/$id'} params={{ id: user.id.toString() }} className="w-full px-2 py-1.5">
                {i18n.t('actions.edit')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive font-semibold"
              onClick={async () => {
                mut.mutate(user.id);
              }}
            >
              {i18n.t('actions.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    id: 'actions',
  },
];
