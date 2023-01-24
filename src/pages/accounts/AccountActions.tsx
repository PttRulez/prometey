import { FC, useState } from 'react';
import { IconButton, styled } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import AccountsService from '../../services/AccountsService';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/redux';
import { openNotification } from '../../store/notificationSlice';
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
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await AccountsService.updateAccount(params.row);
      setSuccess(true);

      setRowId(null);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    } catch (e) {
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Аккаунт не засэйвился :((',
        })
      );
    } finally {
      setLoading(false);
    }
  };

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
    // <Grid container columnSpacing={4}>
    //   <Grid xs={4}>
    //     <IconButton onClick={clickEdit}>
    //       <ModeEditIcon />
    //     </IconButton>
    //   </Grid>
    //   <Grid xs={4}>
    //     <IconButton onClick={clickEdit}>
    //       <MonetizationOnIcon sx={{ color: 'success.light' }} />
    //     </IconButton>
    //   </Grid>
    //   <Grid xs={4}>
    //     <IconButton onClick={clickEdit}>
    //       <MonetizationOnIcon sx={{ color: 'error.light' }} />
    //     </IconButton>
    //   </Grid>
    // </Grid>
  );
};

export default AccountActions;




{/*<Grid xs={3}>*/}
      {/*  {success ? (*/}
      {/*    <Fab*/}
      {/*      color="primary"*/}
      {/*      sx={{*/}
      {/*        width: 40,*/}
      {/*        height: 40,*/}
      {/*        bgcolor: green[500],*/}
      {/*        '&:hover': { bgcolor: green[700] },*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Check />*/}
      {/*    </Fab>*/}
      {/*  ) : (*/}
      {/*    <Fab*/}
      {/*      color="primary"*/}
      {/*      sx={{*/}
      {/*        width: 40,*/}
      {/*        height: 40,*/}
      {/*      }}*/}
      {/*      disabled={params.id !== rowId || loading}*/}
      {/*      onClick={handleSubmit}*/}
      {/*    >*/}
      {/*      <Save />*/}
      {/*    </Fab>*/}
      {/*  )}*/}
      {/*  {loading && (*/}
      {/*    <CircularProgress*/}
      {/*      size={52}*/}
      {/*      sx={{*/}
      {/*        color: green[500],*/}
      {/*        position: 'absolute',*/}
      {/*        top: -6,*/}
      {/*        left: -6,*/}
      {/*        zIndex: 1,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Grid>*/}
