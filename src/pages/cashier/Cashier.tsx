import { FC, useMemo, useState } from 'react';
import { useGetCashierQuery } from '../../api/cashierApiSlice';
import { useAppSelector } from '../../hooks/redux';
import { AdvancedTableColumn } from '../../components/ui/AdvancedTable/AdvancedTable';
import Grid from '@mui/material/Unstable_Grid2';
import { cashoutStatuses } from '../../constants/common';
import { CashoutFromServer, DepositFromServer } from '../../types/cashier';
import CashierFilter from './CashierFilter';
import {
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import CashoutForm from './CashoutForm';
import DepositForm from './DepositForm';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import dayjs from 'dayjs';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';

const Cashier: FC = () => {
  const filters = useAppSelector((state) => state.filters.cashier);
  const { data: cashierResponse } = useGetCashierQuery(filters);
  const [editedCashout, setEditedCashout] = useState<CashoutFromServer | null>(
    null
  );
  const [editedDeposit, setEditedDeposit] = useState<DepositFromServer | null>(
    null
  );

  const cashoutColumns: AdvancedTableColumn[] = useMemo(() => {
    return [
      {
        name: 'networkName',
        label: 'Сеть',
        format: (value, row) => {
          return row.account.room.network.name;
        },
      },
      {
        name: 'nickname',
        label: 'Ник',
        format: (value, row) => {
          return row.account.nickname;
        },
      },
      {
        name: 'amount',
        label: 'Сумма',
      },
      {
        name: 'ordered_date',
        label: 'Заказали',
        format: (value, _) => {
          return value ? dayjs(value).format('DD.MM.YYYY') : '';
        },
      },
      {
        name: 'left_balance_date',
        label: 'Ушло',
        format: (value, _) => {
          return value ? dayjs(value).format('DD.MM.YYYY') : '';
        },
      },
      {
        name: 'actions',
        label: '',
        render: (_, cashout) => {
          return (
            <IconButton
              onClick={() => setEditedCashout(cashout as CashoutFromServer)}
            >
              <ModeEditIcon />
            </IconButton>
          );
        },
      },
    ];
  }, []);

  const depositColumns: AdvancedTableColumn[] = useMemo(() => {
    return [
      {
        name: 'networkName',
        label: 'Сеть',
        format: (value, row) => {
          return row.account.room.network.name;
        },
      },
      {
        name: 'nickname',
        label: 'Ник',
        format: (value, row) => {
          return row.account.nickname;
        },
      },
      {
        name: 'amount',
        label: 'Сумма',
      },
      {
        name: 'ordered_date',
        label: 'Заказали',
        format: (value, _) => {
          return value ? dayjs(value).format('DD.MM.YYYY') : '';
        },
      },
      {
        name: 'reached_balance_date',
        label: 'Пришло',
        format: (value, _) => {
          return value ? dayjs(value).format('DD.MM.YYYY') : '';
        },
      },
      {
        name: 'actions',
        label: '',
        render: (_, deposit) => {
          return (
            <IconButton
              onClick={() => setEditedDeposit(deposit as DepositFromServer)}
            >
              <ModeEditIcon />
            </IconButton>
          );
        },
      },
    ];
  }, []);

  const getCashoutSx = (cashout: CashoutFromServer) => {
    switch (cashout.status_id) {
      case cashoutStatuses.pending:
        return {
          backgroundColor: 'warning.light',
          '&:hover:hover': { backgroundColor: 'warning.main' },
        };
      case cashoutStatuses.succesful:
        return {
          backgroundColor: 'success.light',
          '&:hover:hover': { backgroundColor: 'success.main' },
        };
      case cashoutStatuses.canceled:
        return {
          backgroundColor: 'error.light',
          '&:hover:hover': { backgroundColor: 'error.main' },
        };
      default:
        return {};
    }
  };

  const getDepositSx = (deposit: DepositFromServer) => {
    if (deposit.reached_balance_date) {
      return {
        backgroundColor: 'success.light',
        '&:hover:hover': { backgroundColor: 'success.main' },
      };
    } else {
      return {
        backgroundColor: 'warning.light',
        '&:hover:hover': { backgroundColor: 'warning.main' },
      };
    }
  };

  return (
    <>
      <CashierFilter />
      <Grid container spacing={2}>
        <Grid xs={6}>
          <BasicTable>
            <BasicTableHeader>
              <TableRow>
                <TableCell>Сеть</TableCell>
                <TableCell>Ник</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Заказали</TableCell>
                <TableCell>Ушло</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </BasicTableHeader>

            <TableBody>
              {cashierResponse?.cashouts.map((cashout: CashoutFromServer) => (
                <TableRow sx={getCashoutSx(cashout)}>
                  <TableCell>{cashout.account.room.network.name}</TableCell>
                  <TableCell>{cashout.account.nickname}</TableCell>
                  <TableCell>{cashout.amount}</TableCell>
                  <TableCell>
                    {cashout.ordered_date
                      ? dayjs(cashout.ordered_date).format('DD.MM.YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    {cashout.left_balance_date
                      ? dayjs(cashout.left_balance_date).format('DD.MM.YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        setEditedCashout(cashout as CashoutFromServer)
                      }
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </BasicTable>

          {/*<AdvancedTable*/}
          {/*  columns={cashoutColumns}*/}
          {/*  rows={cashierResponse?.cashouts ?? []}*/}
          {/*  //@ts-ignore*/}
          {/*  rowSx={(cashout: CashoutFromServer) => {*/}
          {/*    switch (cashout.status_id) {*/}
          {/*      case cashoutStatuses.pending:*/}
          {/*        return {*/}
          {/*          backgroundColor: 'warning.light',*/}
          {/*          '&:hover:hover': { backgroundColor: 'warning.main' },*/}
          {/*        };*/}
          {/*      case cashoutStatuses.succesful:*/}
          {/*        return {*/}
          {/*          backgroundColor: 'success.light',*/}
          {/*          '&:hover:hover': { backgroundColor: 'success.main' },*/}
          {/*        };*/}
          {/*      case cashoutStatuses.canceled:*/}
          {/*        return {*/}
          {/*          backgroundColor: 'error.light',*/}
          {/*          '&:hover:hover': { backgroundColor: 'error.main' },*/}
          {/*        };*/}
          {/*      default:*/}
          {/*        return {};*/}
          {/*    }*/}
          {/*  }}*/}
          {/*/>*/}
        </Grid>
        <Grid xs={6}>
          <BasicTable>
            <BasicTableHeader>
              <TableRow>
                <TableCell>Сеть</TableCell>
                <TableCell>Ник</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Заказали</TableCell>
                <TableCell>Ушло</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </BasicTableHeader>

            <TableBody>
              {cashierResponse?.deposits.map((deposit: DepositFromServer) => (
                <TableRow sx={getDepositSx(deposit)}>
                  <TableCell>{deposit.account.room.network.name}</TableCell>
                  <TableCell>{deposit.account.nickname}</TableCell>
                  <TableCell>{deposit.amount}</TableCell>
                  <TableCell>
                    {deposit.ordered_date
                      ? dayjs(deposit.ordered_date).format('DD.MM.YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    {deposit.reached_balance_date
                      ? dayjs(deposit.reached_balance_date).format('DD.MM.YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        setEditedDeposit(deposit as DepositFromServer)
                      }
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </BasicTable>
          {/*<AdvancedTable*/}
          {/*  columns={depositColumns}*/}
          {/*  rows={cashierResponse?.deposits ?? []}*/}
          {/*  //@ts-ignore*/}
          {/*  rowSx={(deposit: DepositFromServer) => {*/}
          {/*    if (deposit.reached_balance_date) {*/}
          {/*      return {*/}
          {/*        backgroundColor: 'success.light',*/}
          {/*        '&:hover:hover': { backgroundColor: 'success.main' },*/}
          {/*      };*/}
          {/*    } else {*/}
          {/*      return {*/}
          {/*        backgroundColor: 'warning.light',*/}
          {/*        '&:hover:hover': { backgroundColor: 'warning.main' },*/}
          {/*      };*/}
          {/*    }*/}
          {/*  }}*/}
          {/*/>*/}
        </Grid>
      </Grid>

      <Dialog
        open={!!editedDeposit}
        onClose={() => setEditedDeposit(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        <>
          {!!editedDeposit && (
            <DepositForm
              account={editedDeposit.account}
              deposit={editedDeposit}
              closeForm={() => setEditedDeposit(null)}
              afterSuccesfulSubmit={() => setEditedDeposit(null)}
            />
          )}
        </>
      </Dialog>

      <Dialog
        open={!!editedCashout}
        onClose={() => setEditedCashout(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        <>
          {!!editedCashout && (
            <CashoutForm
              account={editedCashout?.account}
              cashout={editedCashout}
              closeForm={() => setEditedCashout(null)}
              afterSuccesfulSubmit={() => setEditedCashout(null)}
            />
          )}
        </>
      </Dialog>
    </>
  );
};

export default Cashier;
