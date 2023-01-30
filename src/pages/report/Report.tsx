import { FC, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useGetReportQuery } from '../../api/reportApiSlice';
import { DataGrid } from '@mui/x-data-grid';
import ReportFilters from './ReportFilters';

const Report: FC = () => {
  const reportFilters = useAppSelector((state) => state.filters.report);
  const { data: reportData } = useGetReportQuery(reportFilters);
  const [pageSize, setPageSize] = useState(20);

  const columns = useMemo(
    () => [
      { field: 'bobId', headerName: 'Боб Айди', flex: 1 },
      { field: 'nickname', headerName: 'Ник', flex: 1 },
      { field: 'bankroll_start', headerName: 'Банкролл на начало', flex: 1 },
      { field: 'bankroll_finish', headerName: 'Банкролл на конец', flex: 1 },
      { field: 'hands_played', headerName: 'Руки', flex: 1 },
      { field: 'cashoutsSum', headerName: 'Кэшауты', flex: 1 },
      { field: 'depositsSum', headerName: 'Депозиты', flex: 1 },
      { field: 'win', headerName: 'Выиграно', flex: 1 },
      { field: 'total', headerName: 'Тотал', flex: 1 },
    ],
    []
  );

  return (
    <>
      <ReportFilters />
      <DataGrid
        autoHeight
        sx={{
          maxHeight: '80vh',
          '& .MuiDataGrid-main': { overflowY: 'auto' },
          marginTop: '20px',
        }}
        columns={columns}
        getRowId={(row) => row.id}
        //@ts-ignore
        rows={reportData?.reports ?? []}
        rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
      />
    </>
  );
};

export default Report;
