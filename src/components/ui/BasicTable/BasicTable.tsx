import { FC, ReactNode } from 'react';
import { Paper, Table, TableContainer } from '@mui/material';

type Props = {
  children?: ReactNode;
};

const BasicTable: FC<Props> = ({ children }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ padding: '30px', overflowX: 'initial' }}
    >
      <Table aria-label="simple table" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
