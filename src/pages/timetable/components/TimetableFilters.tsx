import { FC, useEffect } from 'react';
import SelectInput from '../../../components/ui/NonFormInputs/SelectInput';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  fetchTimeTable,
  setTimetableFilters,
} from '../../../store/accountsSlice';

const TimetableFilters: FC = () => {
  const dispatch = useAppDispatch();
  const { timeTableFilters: filters, timetable } = useAppSelector(
    (state) => state.accounts
  );

  useEffect(() => {
    dispatch(fetchTimeTable());
  }, [dispatch, filters]);

  return (
    <Grid container justifyContent={'flex-end'} spacing={2}>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(setTimetableFilters({ ...filters, network_id: '' }))
          }
          label="Сеть"
          options={timetable.networkList}
          value={filters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setTimetableFilters({ ...filters, network_id: e.target.value })
            );
          }}
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(setTimetableFilters({ ...filters, affiliate_id: '' }))
          }
          label="Аффилейт"
          options={timetable.affiliateList}
          value={filters.affiliate_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setTimetableFilters({ ...filters, affiliate_id: e.target.value })
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TimetableFilters;
