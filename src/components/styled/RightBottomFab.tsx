import { Fab, styled } from '@mui/material';

export const RightBottomFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 50,
  right: 50,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    shadow: theme.shadows[12],
  },
}));
