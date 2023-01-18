import { FC } from 'react';
import { Card, CardContent, Link } from '@mui/material';
import { Account } from '../../../types/models';
import { Link as RouterLink } from 'react-router-dom';

interface IAccountCardProps {
  account: Account;
}

const shiftColors: { [key: number]: string } = {
  1: 'primary.light',
  2: 'warning.light',
};

const AccountCard: FC<IAccountCardProps> = ({ account }) => {
  return (
    <Card>
      <CardContent
        sx={{
          textAlign: 'center',
          backgroundColor: shiftColors[account.status_id],
        }}
      >
        <Link
          component={RouterLink}
          to={`/accounts/${account.id}`}
          sx={{ color: 'common.white', textDecoration: 'none' }}
        >
          {account.nickname}
        </Link>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
