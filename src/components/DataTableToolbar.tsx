import { routeTree } from '@src/routeTree.gen';
import { Link, ParseRoute } from '@tanstack/react-router';
import { Table } from '@tanstack/react-table';
import { ChevronDown, Plus } from 'lucide-react';

import { Button } from './Button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu';
import { Input } from './Input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  addPath: ParseRoute<typeof routeTree>['fullPath'];
}

export function DataTableToolbar<TData>({ table, addPath }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center pb-2 gap-2 justify-between">
      <Button asChild>
        <Link to={addPath}>
          <Plus absoluteStrokeWidth size={16} strokeWidth={2} />
          <span className="ms-2">Create</span>
        </Link>
      </Button>
      <Input
        className="max-w-sm"
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        placeholder="Filtrar por nome..."
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Colunas <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  checked={column.getIsVisible()}
                  className="capitalize"
                  key={column.id}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
