import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Grid from '@mui/material/Unstable_Grid2';
import SelectInput from '../../components/ui/NonFormInputs/SelectInput';
import { ReportFilters as ReportFiltersType } from '../../types/report';
import { setReportFilters } from '../../store/filtersSlice';
import TextInput from '../../components/ui/NonFormInputs/TextInput';
import moment from 'moment';
import { SelectList } from '../../types/common';
import { useGetReportQuery } from '../../api/reportApiSlice';
import { useGetBrainListQuery } from '../../api/selectListsApiSlice';
import { monthList } from '../../constants/common';

const ReportFilters: FC = () => {
  const dispatch = useAppDispatch();
  const reportFilters: ReportFiltersType = useAppSelector(
    (state) => state.filters.report
  );
  const { data: brainList } = useGetBrainListQuery();
  const { data: reportData } = useGetReportQuery(reportFilters);

  const yearList = useMemo(() => {
    const todayYear = moment().year();
    const years: SelectList = {};
    for (let year = 2016; year <= todayYear; year++) {
      years[year] = String(year);
    }
    return years;
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <TextInput
          handleClear={() =>
            dispatch(setReportFilters({ ...reportFilters, nickname: '' }))
          }
          label="Ник"
          value={reportFilters.nickname}
          onChange={(e) =>
            dispatch(
              setReportFilters({ ...reportFilters, nickname: e.target.value })
            )
          }
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(setReportFilters({ ...reportFilters, network_id: '' }))
          }
          label="Сеть"
          options={reportData?.networkList ?? []}
          value={reportFilters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setReportFilters({
                ...reportFilters,
                network_id: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          label="Год"
          options={yearList}
          value={reportFilters.year}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setReportFilters({
                ...reportFilters,
                year: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          label="Месяц"
          options={monthList}
          sortItems={false}
          value={reportFilters.month}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setReportFilters({
                ...reportFilters,
                month: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(setReportFilters({ ...reportFilters, brain_id: '' }))
          }
          label="Мозг"
          options={brainList ?? []}
          value={reportFilters.brain_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setReportFilters({
                ...reportFilters,
                brain_id: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default ReportFilters;
