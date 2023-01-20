import { FC, useState } from 'react';
import { Box, CircularProgress, Fab } from '@mui/material';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { GridRenderCellParams } from '@mui/x-data-grid';
import AccountsService from '../../services/AccountsService';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/redux';
import { openNotification } from '../../store/notificationSlice';

const AccountActions: FC<{
  params: GridRenderCellParams;
  rowId: any;
  setRowId: any;
}> = ({ params, rowId, setRowId }) => {
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
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default AccountActions;
