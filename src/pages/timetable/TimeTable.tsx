import { FC, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTimeTable } from '../../store/accountsSlice';
import { Box } from '@mui/material';
import Network from './components/Network';
import TimetableFilters from './components/TimetableFilters';

const TimeTable: FC = () => {
  const dispatch = useAppDispatch();
  const timetable = useAppSelector((state) => state.timetable.timetable);

  useLayoutEffect(() => {
    dispatch(fetchTimeTable({ network_id: 1, affiliate_id: '' }));
  }, [dispatch]);

  return (
    <Box sx={{ margin: 'auto' }}>
      <TimetableFilters />
      {timetable &&
        Object.keys(timetable.models).map((networkName) => (
          <Network
            key={networkName}
            networkName={networkName}
            disciplines={timetable.models[networkName]}
          />
        ))}
    </Box>
  );
};

export default TimeTable;
