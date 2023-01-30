import { FC } from 'react';
import SelectInput from '../../../components/ui/NonFormInputs/SelectInput';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useGetTimetableListsQuery } from '../../../api/selectListsApiSlice';
import { setTimetableFilters } from '../../../store/filtersSlice';

const TimetableFilters: FC = () => {
  const dispatch = useAppDispatch();
  const timetableFilters = useAppSelector((state) => state.filters.timetable);
  const { data: selectLists } = useGetTimetableListsQuery();

  return (
    <Grid container justifyContent={'flex-end'} spacing={2}>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(
              setTimetableFilters({ ...timetableFilters, network_id: '' })
            )
          }
          label="Сеть"
          options={selectLists?.networkList ?? []}
          value={timetableFilters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setTimetableFilters({
                ...timetableFilters,
                network_id: e.target.value,
              })
            );
          }}
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(
              setTimetableFilters({ ...timetableFilters, affiliate_id: '' })
            )
          }
          label="Аффилейт"
          options={selectLists?.affiliateList ?? []}
          value={timetableFilters.affiliate_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setTimetableFilters({
                ...timetableFilters,
                affiliate_id: e.target.value,
              })
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TimetableFilters;
