import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import LimitGroup from './LimitGroup';

interface IDisciplineTimetableProps {
  disciplineName: string;
  limits: { [key: string]: any };
}

const Discipline: FC<IDisciplineTimetableProps> = ({
  disciplineName,
  limits,
}) => {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          backgroundColor: 'grey.400',
          borderRadius: 2,
          textAlign: 'center',
          padding: 2,
        }}
      >
        {disciplineName}
      </Typography>
      <Stack spacing={2}>
        {Object.keys(limits).map((limitGroupName) => (
          <LimitGroup
            limitGroupName={limitGroupName}
            shifts={limits[limitGroupName]}
            key={limitGroupName}
          />
        ))}
      </Stack>
    </>
  );
};

export default Discipline;
