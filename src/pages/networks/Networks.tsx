import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Link,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchNetworks } from '../../store/networksSlice';
import { Link as RouterLink } from 'react-router-dom';

const Networks: FC = () => {
  const dispatch = useAppDispatch();
  const { networkList } = useAppSelector(state => state.networks);

  useEffect(() => {
    dispatch(fetchNetworks());
  }, []);

  return (
    <TableContainer component={Paper} sx={{ padding: '30px' }}>
      <Table aria-label='simple table'>
        <TableHead sx={{ th: { fontWeight: 'bold', textAlign: 'center' } }}>
          <TableRow>
            <TableCell sx={{ minWidth: '300px' }}>Название</TableCell>
            <TableCell>Доп инфо</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {networkList.map(network => (
            <TableRow key={network.name}>
              <TableCell>
                <Link component={RouterLink} to={`/networks/${network.id}`} underline="hover">
                  {network.name}
                </Link>
              </TableCell>

              <TableCell>{network.info}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Networks;
