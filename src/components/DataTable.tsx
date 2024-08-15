import i18n from '@config/i18n/main';
import { routeTree } from '@src/routeTree.gen';
import { ParseRoute } from '@tanstack/react-router';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

import { DataTableToolbar } from './DataTableToolbar';
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
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    onPaginationChange,
    state: {
      pagination: paginationState,
    },
    debugTable: true,
  });

  return (
    <section>
      <DataTableToolbar addPath={addPath} table={table} />
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
                  {i18n.t('table.notFound')}
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
