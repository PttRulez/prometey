import { FC, Fragment, useMemo, useState } from 'react';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import {
  Button,
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetAccountQuery } from '../../api/accountApiSlice';
import dayjs from 'dayjs';
import { AccountFromServer } from '../../types/accounts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Grid from '@mui/material/Unstable_Grid2';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DepositForm from '../cashier/DepositForm';
import { emptyCashout, emptyDeposit } from '../../constants/empties';
import CashoutForm from '../cashier/CashoutForm';
import AccountForm from './components/AccountForm';

const SingleAccount: FC = () => {
  const [addDeposit, setAddDeposit] = useState(false);
  const [addCashout, setAddCashout] = useState(false);
  const [edit, setEdit] = useState(false);

  const { id } = useParams();
  const { data } = useGetAccountQuery(Number(id));
  let transactions;
  let account: AccountFromServer | undefined;

  if (data) {
    transactions = data.transactions;
    account = data.account;
  }

  const accountToDisplay = useMemo(() => {
    if (!account) return null;

    return [
      {
        name: 'Дата создания',
        value: dayjs(account.creation_date).format('DD.MM.YYYY'),
      },
      { name: 'Никнейм', value: account.nickname },
      { name: 'Боб Айди', value: account.bob_id_name },
      { name: 'Сеть', value: account.room.network.name },
      { name: 'Рум', value: account?.room.name },
      { name: 'Дисциплина', value: account.disciplines.join(' ') },
      { name: 'Лимиты', value: account.limits.join(' ') },
      { name: 'Смена', value: account.shift },
      { name: 'Аффилейт', value: account.affiliate?.name },
      { name: 'Логин', value: account.login },
      { name: 'Пароль', value: account.password },
      { name: 'Прокси', value: account?.proxy?.name },
      { name: 'Инфо', value: account.info },
      { name: 'Создатель', value: account.created_by.name },
      {
        name: 'Комментарий по текущему статусу аккаунта',
        value: account.comment,
      },
    ];
  }, [account]);

  return (
    <Fragment>
      <Grid spacing={2} container sx={{ marginBottom: '20px' }}>
        <Grid>
          <Button variant="outlined" onClick={() => setAddCashout(true)}>
            Кэшаут
            <MonetizationOnIcon sx={{ color: 'success.light' }} />
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={() => setAddDeposit(true)}>
            Депозит
            <MonetizationOnIcon sx={{ color: 'error.light' }} />
          </Button>
        </Grid>
        <Grid>
          <IconButton onClick={() => setEdit(true)}>
            <ModeEditIcon />
          </IconButton>
        </Grid>
      </Grid>
      {accountToDisplay && (
        <BasicTable sx={{ width: 'max-content' }}>
          <TableBody>
            {accountToDisplay.map((prop) => (
              <TableRow key={prop.name}>
                <TableCell sx={{ fontWeight: 'bold' }}>{prop.name}</TableCell>
                <TableCell>{prop.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </BasicTable>
      )}

      {account && (
        <Fragment>
          <Dialog open={addDeposit} onClose={() => setAddDeposit(false)}>
            <DepositForm
              account={account || {}}
              deposit={emptyDeposit}
              closeForm={() => setAddDeposit(false)}
              afterSuccesfulSubmit={() => setAddDeposit(false)}
            />
          </Dialog>
          <Dialog open={addCashout} onClose={() => setAddCashout(false)}>
            <CashoutForm
              account={account || {}}
              cashout={emptyCashout}
              closeForm={() => setAddCashout(false)}
              afterSuccesfulSubmit={() => setAddCashout(false)}
            />
          </Dialog>
          <Dialog open={edit} onClose={() => setEdit(false)}>
            <AccountForm
              account={account || {}}
              afterSuccesfulSubmit={() => setEdit(false)}
            />
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SingleAccount;
