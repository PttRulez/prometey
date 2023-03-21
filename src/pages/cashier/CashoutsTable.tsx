import { FC, Fragment, useState } from 'react';
import { CashoutFromServer } from '../../types/cashier';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import {
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import dayjs from 'dayjs';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { cashoutStatuses } from '../../constants/common';
import CashoutForm from './CashoutForm';
import MyLink from '../../components/ui/MyLink';

interface Props {
  cashouts: CashoutFromServer[];
}

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

const CashoutsTable: FC<Props> = ({ cashouts }) => {
  const [editedCashout, setEditedCashout] = useState<CashoutFromServer | null>(
    null
  );
  return (
    <Fragment>
      <BasicTable title="Кэшауты">
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
          {cashouts.map((cashout: CashoutFromServer) => (
            <TableRow sx={getCashoutSx(cashout)} key={cashout.id}>
              <TableCell>{cashout.account.room.network.name}</TableCell>
              <TableCell>
                <MyLink to={`/accounts/${cashout.account.id}`} sx={{color: 'white'}}>{cashout.account.nickname}</MyLink>
              </TableCell>
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
                  onClick={() => setEditedCashout(cashout as CashoutFromServer)}
                >
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>

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
    </Fragment>
  );
};

export default CashoutsTable;
