import { DataTable } from '@components/DataTable';
import i18n from '@config/i18n/main';
import { countTable } from '@src/database/queries/count';
import { deleteFromTable } from '@src/database/queries/delete';
import { selectManyUser } from '@src/database/queries/select';
import { keepPreviousData, useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { asyncWrapper } from '@utils/asyncWrapper';
import { toastError, toastSuccess } from '@utils/toastMessage';
import { columns } from '@utils/userColumn';
import { useState } from 'react';

const UserList = () => {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [userList, userCount] = useQueries({
    queries: [
      {
        placeholderData: keepPreviousData,
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

  const removeUser = useMutation({
    mutationFn: async (id: number) => {
      const [, error] = await asyncWrapper(deleteFromTable, 'users', id);
      if (error) return toastError();
      return toastSuccess(i18n.t('general.response.deleted', { what: i18n.t('general.data.user') }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userList'] });
      queryClient.invalidateQueries({ queryKey: ['userCount'] });
    },
  });

  return (
    <div>
      <DataTable
        columns={columns(removeUser)}
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
