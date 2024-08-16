import { DataTable } from '@components/DataTable';
import i18n from '@config/i18n/main';
import { countTable } from '@src/database/queries/count';
import { deleteFromTable } from '@src/database/queries/delete';
import { selectManyAgent } from '@src/database/queries/select';
import { keepPreviousData, useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { columns } from '@utils/agentColumn';
import { asyncWrapper } from '@utils/asyncWrapper';
import { toastError, toastSuccess } from '@utils/toastMessage';
import { useState } from 'react';

const AgentList = () => {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const [agentList, agentCount] = useQueries({
    queries: [
      {
        placeholderData: keepPreviousData,
        queryKey: ['agentList', pagination],
        queryFn: async () => {
          const [data] = await asyncWrapper(selectManyAgent);
          return data;
        },
      },
      {
        queryKey: ['agentCount'],
        queryFn: async () => {
          const [data] = await asyncWrapper(countTable, 'agents');
          return data && data[0];
        },
      },
    ],
  });

  const removeAgent = useMutation({
    mutationFn: async (id: number) => {
      const [, error] = await asyncWrapper(deleteFromTable, 'agents', id);
      console.log(error);
      if (error) return toastError();
      return toastSuccess(i18n.t('generic.deleted', { what: i18n.t('table.columns.agent_name') }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentList'] });
      queryClient.invalidateQueries({ queryKey: ['agentCount'] });
    },
  });

  return (
    <div>
      <DataTable
        columns={columns(removeAgent)}
        data={agentList.data ?? []}
        rowCount={agentCount.data?.rowCount ?? 0}
        onPaginationChange={setPagination}
        paginationState={pagination}
        addPath={'/agent/new'}
      />
    </div>
  );
};

export default AgentList;
