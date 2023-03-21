import { FC } from 'react';
import { useGetCashierQuery } from '../../api/cashierApiSlice';
import { useAppSelector } from '../../hooks/redux';
import Grid from '@mui/material/Unstable_Grid2';
import CashierFilter from './CashierFilter';
import CashoutsTable from './CashoutsTable';
import DepositTable from './DepositTable';

const Cashier: FC = () => {
  const filters = useAppSelector((state) => state.filters.cashier);
  const { data: cashierResponse } = useGetCashierQuery(filters);

  return (
    <>
      <CashierFilter />
      <Grid container spacing={2}>
        <Grid xs={6}>
          <CashoutsTable cashouts={cashierResponse?.cashouts ?? []} />
        </Grid>

        {/*Таблица депозитов*/}
        <Grid xs={6}>
          <DepositTable deposits={cashierResponse?.deposits ?? []} />
        </Grid>
      </Grid>
    </>
  );
};

export default Cashier;
