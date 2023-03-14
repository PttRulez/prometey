import { FC, useEffect, useMemo, useState } from 'react';
import { useGetCashierQuery } from '../../api/cashierApiSlice';
import { useAppSelector } from '../../hooks/redux';
import AdvancedTable, {
  AdvancedTableColumn,
} from '../../components/ui/AdvancedTable/AdvancedTable';
import Grid from '@mui/material/Unstable_Grid2';
import { cashoutStatuses } from '../../constants/common';
import { CashoutFromServer, DepositFromServer } from '../../types/cashier';
import CashierFilter from './CashierFilter';
import { Dialog, IconButton } from '@mui/material';
import CashoutForm from './CashoutForm';
import DepositForm from './DepositForm';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import dayjs from 'dayjs';

const Cashier: FC = () => {
  const filters = useAppSelector((state) => state.filters.cashier);
  const { data: cashierResponse } = useGetCashierQuery(filters);
  const [editedCashout, setEditedCashout] = useState<CashoutFromServer | null>(
    null
  );
  const [editedDeposit, setEditedDeposit] = useState<DepositFromServer | null>(
    null
  );

  useEffect(() => {
    console.log('cashierResponse', cashierResponse);
  }, [cashierResponse]);

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

  return (
    <>
      <CashierFilter />
      <Grid container spacing={2}>
        <Grid xs={6}>
          <AdvancedTable
            columns={cashoutColumns}
            rows={cashierResponse?.cashouts ?? []}
            //@ts-ignore
            rowSx={(cashout: CashoutFromServer) => {
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
            }}
          />
        </Grid>
        <Grid xs={6}>
          <AdvancedTable
            columns={depositColumns}
            rows={cashierResponse?.deposits ?? []}
            //@ts-ignore
            rowSx={(deposit: DepositFromServer) => {
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
            }}
          />
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
