import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Grid from '@mui/material/Unstable_Grid2';
import SelectInput from '../../components/ui/NonFormInputs/SelectInput';
import { setCashierFilters } from '../../store/filtersSlice';
import { CashierCategoryValue, CashierFilters } from '../../types/cashier';
import { useGetCashierQuery } from '../../api/cashierApiSlice';
import CheckboxInput from '../../components/ui/NonFormInputs/CheckboxInput';

const CashierFilter: FC = () => {
  const dispatch = useAppDispatch();
  const cashierFilters: CashierFilters = useAppSelector(
    (state) => state.filters.cashier
  );
  const { data } = useGetCashierQuery(cashierFilters);

  return (
    <Grid container spacing={4}>
      <Grid>
        <CheckboxInput
          label="Ждём"
          checked={cashierFilters.wait}
          onChange={(e) => {
            console.log(e.target.checked);
            dispatch(
              setCashierFilters({ ...cashierFilters, wait: e.target.checked })
            );
          }}
        />
      </Grid>
      <Grid>
        <SelectInput
          label="Тип"
          options={[
            { id: 'both', name: 'Всё' },
            { id: 'cashouts', name: 'Кэшауты' },
            { id: 'deposits', name: 'Депозиты' },
          ]}
          value={cashierFilters.category}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setCashierFilters({
                ...cashierFilters,
                category: e.target.value as CashierCategoryValue,
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(setCashierFilters({ ...cashierFilters, network_id: '' }))
          }
          label="Сеть"
          options={data?.networkList ?? []}
          value={cashierFilters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setCashierFilters({
                ...cashierFilters,
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

export default CashierFilter;
