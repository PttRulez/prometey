import { Box, BoxProps, Stack, styled, Typography } from '@mui/material';
import { FC } from 'react';
import Discipline from './Discipline';

interface INetworkTimetableProps {
  networkName: string;
  disciplines: { [key: string]: any };
}

const Network: FC<INetworkTimetableProps> = ({ networkName, disciplines }) => {
  const NetworkBox = styled(Box)<BoxProps>(({ theme }) => {
    return {
      padding: 10,
      // border: `1px solid ${theme.palette.secondary.main}`,
      shadow: theme.shadows[7],
      minWidth: '960px',
      // width: 'fit-content',
      margin: 'auto',
      borderRadius: '10px',
      width: '100%',
    };
  });

  return (
    <NetworkBox>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {networkName}
      </Typography>
      <Stack spacing={1}>
        {Object.keys(disciplines).map((disciplineName) => (
          <Discipline
            key={disciplineName}
            disciplineName={disciplineName}
            limits={disciplines[disciplineName]}
          />
        ))}
      </Stack>
    </NetworkBox>
  );
};

export default Network;
