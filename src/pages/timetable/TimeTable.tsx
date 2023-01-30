import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Box } from '@mui/material';
import Network from './components/Network';
import TimetableFilters from './components/TimetableFilters';
import { useGetTimetableQuery } from '../../api/accountApiSlice';

const TimeTable: FC = () => {
  const timeTableFilters = useAppSelector((state) => state.filters.timetable);
  const { data: models } = useGetTimetableQuery(timeTableFilters);

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
