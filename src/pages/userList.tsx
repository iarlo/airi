import { DataTable } from '@components/DataTable';
import { countTable } from '@src/database/queries/count';
import { selectManyUser } from '@src/database/queries/select';
import { useQueries } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { asyncWrapper } from '@utils/asyncWrapper';
import { columns } from '@utils/userColumn';
import { useState } from 'react';

const UserList = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [userList, userCount] = useQueries({
    queries: [
      {
        queryKey: ['userList', pagination],
        queryFn: async () => {
          const [data] = await asyncWrapper(
            selectManyUser,
            pagination.pageSize,
            pagination.pageSize * pagination.pageIndex
          );
          // TODO : toast error
          return data;
        },
      },
      {
        queryKey: ['userCount'],
        queryFn: async () => {
          const [data] = await asyncWrapper(countTable, 'users');
          // TODO : toast error
          return data && data[0];
        },
      },
    ],
  });

  return (
    <div>
      <DataTable
        columns={columns}
        data={userList.data ?? []}
        rowCount={userCount.data?.rowCount ?? 0}
        onPaginationChange={setPagination}
        paginationState={pagination}
        addPath={'/user/new'}
      />
    </div>
  );
};

export default UserList;
