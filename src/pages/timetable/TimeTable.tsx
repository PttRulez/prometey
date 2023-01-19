import { FC, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTimeTable } from '../../store/accountsSlice';
import { Box } from '@mui/material';
import Network from './components/Network';
import TimetableFilters from './components/TimetableFilters';

const TimeTable: FC = () => {
  const dispatch = useAppDispatch();
  const { models } = useAppSelector((state) => state.accounts.timetable);

  useLayoutEffect(() => {
    dispatch(fetchTimeTable());
  }, [dispatch]);

  return (
    <Box sx={{ margin: 'auto' }}>
      <TimetableFilters />
      {models &&
        Object.keys(models).map((networkName) => (
          <Network
            key={networkName}
            networkName={networkName}
            disciplines={models[networkName]}
          />
        ))}
    </Box>
  );
};

export default TimeTable;
