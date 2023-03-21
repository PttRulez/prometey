import { FC, Fragment, useState } from 'react';
import { DepositFromServer } from '../../types/cashier';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import {
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DepositForm from './DepositForm';
import MyLink from '../../components/ui/MyLink';

interface Props {
  deposits: DepositFromServer[];
}

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

const DepositTable: FC<Props> = ({ deposits }) => {
  const [editedDeposit, setEditedDeposit] = useState<DepositFromServer | null>(
    null
  );

  return (
    <Fragment>
      <BasicTable title="Депозиты">
        <BasicTableHeader>
          <TableRow>
            <TableCell>Сеть</TableCell>
            <TableCell>Ник</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell>Заказали</TableCell>
            <TableCell>Пришло</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </BasicTableHeader>

        <TableBody>
          {deposits.map((deposit: DepositFromServer) => (
            <TableRow sx={getDepositSx(deposit)} key={deposit.id}>
              <TableCell>{deposit.account.room.network.name}</TableCell>
              <TableCell>
                <MyLink
                  to={`/accounts/${deposit.account.id}`}
                  sx={{ color: 'white' }}
                >
                  {deposit.account.nickname}
                </MyLink>
              </TableCell>
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
                  onClick={() => setEditedDeposit(deposit as DepositFromServer)}
                >
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>

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
    </Fragment>
  );
};

export default DepositTable;
