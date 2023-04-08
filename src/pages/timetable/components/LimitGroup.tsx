import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/material';
import AccountCard from './AccountCard';
import { AccountFromServer } from '../../../types/accounts';
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
            <Grid xs={4} key={uuid()}>
                <Stack spacing={2}>
                  {shifts[1]?.map((account: AccountFromServer) => (
                    <AccountCard account={account} key={uuid()} />
                  ))}
                </Stack>
            </Grid>
           <Grid xs={4} key={uuid()}>
                <Stack spacing={2}>
                  {shifts[2]?.map((account: AccountFromServer) => (
                    <AccountCard account={account} key={uuid()} />
                  ))}
                </Stack>
            </Grid>
           <Grid xs={4} key={uuid()}>
                <Stack spacing={2}>
                  {shifts[3]?.map((account: AccountFromServer) => (
                    <AccountCard account={account} key={uuid()} />
                  ))}
                </Stack>
            </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LimitGroup;
