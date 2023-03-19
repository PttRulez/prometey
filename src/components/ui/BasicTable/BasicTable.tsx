import { FC, ReactNode } from 'react';
import { Paper, SxProps, Table, TableContainer } from '@mui/material';

interface Props {
  children?: ReactNode;
  sx?: SxProps;
};

const BasicTable: FC<Props> = ({ children, sx }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ padding: '30px', overflowX: 'initial', ...sx }}
    >
      <Table aria-label="simple table" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
