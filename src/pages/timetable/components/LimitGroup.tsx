import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/material';
import AccountCard from './AccountCard';
import { Account } from '../../../types/models';
import { v4 as uuid } from 'uuid';

interface ILimitGroupProps {
  limitGroupName: string;
  shifts: { [key: string]: any };
}

const LimitGroup: FC<ILimitGroupProps> = ({ limitGroupName, shifts }) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid
          xs={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey.200',
            borderRadius: 2,
          }}
        >
          {limitGroupName}
        </Grid>
        <Grid xs={11} container columnSpacing={1}>
          {Object.values(shifts).map((accounts) => (
            <Grid xs={4} key={uuid()}>
              <Stack spacing={2}>
                {accounts.map((account: Account) => (
                  <AccountCard account={account} key={uuid()} />
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LimitGroup;
