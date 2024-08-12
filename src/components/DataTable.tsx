import { routeTree } from '@src/routeTree.gen';
import { Link, ParseRoute } from '@tanstack/react-router';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { Plus, ChevronDown } from 'lucide-react';

import { Button } from './Button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu';
import { Input } from './Input';
import { DataTablePagination } from './PaginationControls';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  onPaginationChange: OnChangeFn<PaginationState>;
  paginationState: PaginationState;
  addPath: ParseRoute<typeof routeTree>['fullPath'];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  onPaginationChange,
  paginationState,
  addPath,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    rowCount,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange,
    state: {
      pagination: paginationState,
    },
    debugTable: true,
  });

  return (
    <section className="py-4">
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
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </section>
  );
}
