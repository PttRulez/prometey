import { FC, useEffect } from 'react';
import Select from '../../../components/ui/Select';
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
  }, [filters]);
  return (
    <Grid container justifyContent={'flex-end'} spacing={2}>
      <Grid>
        <Select
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
        <Select
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

  // return (
  //   <Grid
  //     container
  //     // alignItems="stretch"
  //     // sx={{ justifyContent: 'end' }}
  //     justifyContent={'flex-end'}
  //     spacing={2}
  //   >
  //     <Grid>
  //       <FormSelect
  //         // @ts-expect-error
  //         control={control}
  //         handleClear={() => setValue('network_id', '')}
  //         label="Сеть"
  //         name="network_id"
  //         options={networkList}
  //         // value={watchAll.network_id}
  //         sx={{ minWidth: 200 }}
  //       />
  //     </Grid>
  //     <Grid>
  //       <FormSelect
  //         // @ts-expect-error
  //         control={control}
  //         handleClear={() => setValue('affiliate_id', '')}
  //         label="Аффилейт"
  //         name="affiliate_id"
  //         options={affiliateList}
  //         value={watchAll.affiliate_id}
  //         sx={{ minWidth: 200 }}
  //       />
  //     </Grid>
  //     <Grid>
  //       <Button
  //         onClick={handleSubmit(onSubmit)}
  //         variant={'contained'}
  //         sx={{ height: '100%' }}
  //       >
  //         Фильтр
  //       </Button>
  //     </Grid>
  //   </Grid>
  // );
};

export default TimetableFilters;
