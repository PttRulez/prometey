import { FC } from 'react';
import { useGetCashierQuery } from '../../api/cashierApiSlice';
import { useAppSelector } from '../../hooks/redux';

const Cashier: FC = () => {
  const filters = useAppSelector((state) => state.filters.cashier);
  const { data: cashierResponse } = useGetCashierQuery(filters);

  return <div>Cashier</div>;
};

export default Cashier;
