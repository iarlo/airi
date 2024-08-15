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
import { Agent } from '@src/database/main';
import { UseMutationResult } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

type Props = UseMutationResult<
  {
    id: string;
  },
  Error,
  number,
  unknown
>;

export const columns = (mut: Props): ColumnDef<Agent>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: i18n.t('table.user.columns.name'),
  },
  {
    accessorKey: 'phone',
    header: i18n.t('table.user.columns.phone'),
  },
  {
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.name ?? '')}>
              Copiar nome
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Link to={'/'} params={{ id: user.id.toString() }} className="w-full px-2 py-1.5">
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive font-semibold"
              onClick={async () => {
                mut.mutate(user.id);
              }}
            >
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    id: 'actions',
  },
];
