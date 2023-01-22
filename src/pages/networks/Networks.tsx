import { Link, TableBody, TableCell, TableRow } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchNetworks } from '../../store/networksSlice';
import { Link as RouterLink } from 'react-router-dom';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';

const Networks: FC = () => {
  const dispatch = useAppDispatch();
  const { networkList } = useAppSelector((state) => state.networks);

  useEffect(() => {
    dispatch(fetchNetworks());
  }, [dispatch]);

  return (
    <BasicTable>
      <BasicTableHeader>
        <TableRow>
          <TableCell sx={{ minWidth: '300px' }}>Название</TableCell>
          <TableCell>Доп инфо</TableCell>
        </TableRow>
      </BasicTableHeader>

      <TableBody>
        {networkList.map((network) => (
          <TableRow key={network.name}>
            <TableCell>
              <Link
                component={RouterLink}
                to={`/networks/${network.id}`}
                underline="hover"
              >
                {network.name}
              </Link>
            </TableCell>

            <TableCell>{network.info}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </BasicTable>
  );
};

export default Networks;
