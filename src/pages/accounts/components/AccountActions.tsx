import { FC } from 'react';
import { IconButton, styled } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '20px',
}));

const AccountActions: FC<{
  clickEdit: () => void;
  params: GridRenderCellParams;
  clickCashout: () => void;
  clickDeposit: () => void;
  rowId: any;
  setRowId: any;
}> = ({ clickEdit, clickCashout, clickDeposit, params, rowId, setRowId }) => {

  return (
    <Actions>
      <IconButton onClick={clickEdit}>
        <ModeEditIcon />
      </IconButton>

      <IconButton onClick={clickCashout}>
        <MonetizationOnIcon sx={{ color: 'success.light' }} />
      </IconButton>

      <IconButton onClick={clickDeposit}>
        <MonetizationOnIcon sx={{ color: 'error.light' }} />
      </IconButton>
    </Actions>
  );
};

export default AccountActions;
