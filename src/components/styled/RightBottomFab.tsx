import { Fab, styled } from '@mui/material';

export const RightBottomFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    shadow: theme.shadows[12],
  },
}));
