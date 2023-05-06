import { FC, Fragment, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  useCreateReportMutation,
  useDeleteReportMutation,
  useGetReportQuery,
  useUpdateMonthBankrollsMutation,
  useUpdateReportMutation,
} from '../../api/reportApiSlice';
import {
  DataGrid,
  GridColDef,
  GridFooter,
  GridFooterContainer,
} from '@mui/x-data-grid';
import ReportFilters from './ReportFilters';
import {
  MonthBankrollsUpdate,
  Report as ReportType,
  reportFormProps,
  ReportFromServer,
} from '../../types/report';
import { pick } from 'lodash';
import { openNotification } from '../../store/notificationSlice';
import { AxiosError } from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import DepositForm from '../cashier/DepositForm';
import { emptyCashout, emptyDeposit } from '../../constants/empties';
import CashoutForm from '../cashier/CashoutForm';
import Grid from '@mui/material/Unstable_Grid2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MyLink from '../../components/ui/MyLink';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const Report: FC = () => {
  const dispatch = useAppDispatch();
  const reportFilters = useAppSelector((state) => state.filters.report);
  const { data: reportData } = useGetReportQuery(reportFilters);
  const [pageSize, setPageSize] = useState(20);
  const [updateReport] = useUpdateReportMutation();
  const [
    updateMonthBankrolls,
    { isLoading: monthIsUpdating },
  ] = useUpdateMonthBankrollsMutation();
  const [createMonth] = useCreateReportMutation();
  const [depositAccount, setDepositAccount] = useState(null);
  const [cashoutAccount, setCashoutAccount] = useState(null);
  const [reportToDelete, setReportToDelete] = useState<ReportFromServer | null>(
    null
  );
  const [deleteReport] = useDeleteReportMutation();

  const columns: GridColDef[] = useMemo(
    () =>
      [
        {
          field: 'bob_id_name',
          headerName: 'Боб Айди',
          flex: 1,
          valueGetter: (params) => params.row.account.bob_id_name,
        },
        {
          field: 'nickname',
          headerName: 'Ник',
          flex: 1,
          renderCell: (params) => (
            <MyLink to={`/accounts/${params.row.account.id}`}>
              {params.row.nickname}
            </MyLink>
          ),
        },
        {
          field: 'bankroll_start',
          headerName: 'Банкролл на начало',
          flex: 1,
          editable: true,
          type: 'number',
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'bankroll_finish',
          headerName: 'Банкролл на конец',
          flex: 1,
          editable: true,
          type: 'number',
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'hands_played',
          headerName: 'Руки',
          flex: 1,
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'cashoutsSum',
          headerName: 'Кэшауты',
          flex: 1,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => (
            <Box
              onClick={() => setCashoutAccount(params.row.account)}
              sx={{ cursor: 'pointer' }}
            >
              {params.value}
            </Box>
          ),
        },
        {
          field: 'depositsSum',
          headerName: 'Депозиты',
          flex: 1,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => (
            <Box
              onClick={() => setDepositAccount(params.row.account)}
              sx={{ cursor: 'pointer' }}
            >
              {params.value}
            </Box>
          ),
        },
        {
          field: 'win',
          headerName: 'Выиграно',
          flex: 1,
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'total',
          headerName: 'Тотал',
          flex: 1,
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'actions',
          renderCell: (params) => (
            <IconButton onClick={() => setReportToDelete(params.row)}>
              <DeleteTwoToneIcon />
            </IconButton>
          ),
        },
      ] as GridColDef[],
    []
  );

  const totalSum = useMemo(() => {
    if (!reportData || reportData.reports.length === 0) return 0;

    return reportData.reports.reduce(
      (sum, report: ReportFromServer) => report.total + sum,
      0
    );
  }, [reportData]);

  const editHandler = async (
    newRow: ReportFromServer,
    oldRow: ReportFromServer
  ): Promise<ReportFromServer> => {
    const body = pick(newRow, reportFormProps) as ReportType;

    try {
      await updateReport(body).unwrap();

      dispatch(
        openNotification({
          type: 'success',
          text: 'Отчет обновлен',
        })
      );
    } catch (e) {
      console.log('e', e);
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Не удалось обновить отчет',
        })
      );
    } finally {
      return newRow;
    }
  };

  const footerConstructor = () => {
    return (
      <GridFooterContainer>
        <Grid>
          <IconButton
            onClick={() =>
              updateMonthBankrolls(
                pick(reportFilters, ['year', 'month']) as MonthBankrollsUpdate
              )
            }
          >
            {monthIsUpdating ? <CircularProgress /> : <CalendarMonthIcon />}
          </IconButton>
          l
        </Grid>
        <Grid>
          <IconButton
            onClick={() =>
              createMonth(
                pick(reportFilters, ['year', 'month']) as MonthBankrollsUpdate
              )
            }
          >
            <CreateNewFolderOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid
          flexGrow={1}
          sx={{
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: totalSum > 0 ? 'success.light' : 'error.light',
              fontSize: '24px',
              fontWeight: 'bold',
              borderRadius: '100%',
              display: 'inline',
              padding: '5px',
            }}
          >
            {totalSum}
          </Box>
        </Grid>
        <GridFooter sx={{ float: 'right' }} />
      </GridFooterContainer>
    );
  };

  return (
    <Fragment>
      <Grid container>
        <Grid>
          <ReportFilters />
        </Grid>
        <Grid>
          <IconButton
            onClick={() =>
              updateMonthBankrolls(
                pick(reportFilters, ['year', 'month']) as MonthBankrollsUpdate
              )
            }
          >
            <CalendarMonthIcon />
          </IconButton>
        </Grid>
      </Grid>

      <DataGrid
        components={{ Footer: footerConstructor }}
        editMode="row"
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
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={pageSize}
        processRowUpdate={editHandler}
      />
      <Dialog open={!!depositAccount} onClose={() => setDepositAccount(null)}>
        {depositAccount && (
          <DepositForm
            account={depositAccount}
            deposit={emptyDeposit}
            closeForm={() => setDepositAccount(null)}
            afterSuccesfulSubmit={() => setDepositAccount(null)}
          />
        )}
      </Dialog>
      <Dialog open={!!cashoutAccount} onClose={() => setCashoutAccount(null)}>
        {cashoutAccount && (
          <CashoutForm
            account={cashoutAccount}
            cashout={emptyCashout}
            closeForm={() => setCashoutAccount(null)}
            afterSuccesfulSubmit={() => setCashoutAccount(null)}
          />
        )}
      </Dialog>
      <Dialog open={!!reportToDelete} sx={{ padding: 0 }}>
        {reportToDelete && (
          <>
            <DialogContent>
              Удалить {reportToDelete.account.nickname} из отчета?
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => setReportToDelete(null)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  await deleteReport(reportToDelete.id);
                  setReportToDelete(null);
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Fragment>
  );
};

export default Report;

