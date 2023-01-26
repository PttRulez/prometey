import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Grid from '@mui/material/Unstable_Grid2';
import SelectInput from '../../components/ui/NonFormInputs/SelectInput';
import { ReportFilters } from '../../types/report';
import { setReportFilters } from '../../store/filtersSlice';
import TextInput from '../../components/ui/NonFormInputs/TextInput';
import moment from 'moment';
import { SelectList } from '../../types/common';
import { useGetReportQuery } from '../../api/reportApiSlice';

const ReportFilter: FC = () => {
  const dispatch = useAppDispatch();
  const reportFilters: ReportFilters = useAppSelector(
    (state) => state.filters.report
  );
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
            setReportFilters({ ...reportFilters, nickname: '' })
          }
          label="Ник"
          value={reportFilters.nickname}
          onChange={(e) => {
            setReportFilters({ ...reportFilters, nickname: e.target.value });
          }}
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
    </Grid>
  );
};

export default ReportFilter;
