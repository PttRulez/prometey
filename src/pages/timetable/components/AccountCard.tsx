import { FC } from 'react';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { AccountFromServer } from '../../../types/accounts';
import { Link as RouterLink } from 'react-router-dom';

interface IAccountCardProps {
  account: AccountFromServer;
}

const shiftColors: { [key: number]: string } = {
  1: 'primary.light',
  2: 'warning.light',
};

const AccountCard: FC<IAccountCardProps> = ({ account }) => {
  return (
    <Link
      component={RouterLink}
      to={`/accounts/${account.id}`}
      sx={{ color: 'common.white', textDecoration: 'none' }}
    >
      <Card>
        <CardContent
          sx={{
            textAlign: 'center',
            backgroundColor: shiftColors[account.status_id],
            color: 'common.white', textDecoration: 'none'
          }}
        >
          <Typography variant='body2' sx={{textAlign: 'left', color: 'grey.800'}}>{account.affiliate?.name}</Typography>
          <p>{account.nickname} - {account.limits.join(', ')}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AccountCard;
