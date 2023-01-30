import { Link, TableBody, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import { useGetNetworksQuery } from '../../api/networksApiSlice';

const Networks: FC = () => {
  const { data: networks } = useGetNetworksQuery();

  return (
    <BasicTable>
      <BasicTableHeader>
        <TableRow>
          <TableCell sx={{ minWidth: '300px' }}>Название</TableCell>
          <TableCell>Доп инфо</TableCell>
        </TableRow>
      </BasicTableHeader>

      <TableBody>
        {networks &&
          networks.map((network) => (
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
