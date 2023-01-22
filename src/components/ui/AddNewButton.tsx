import { Fab, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react';
import { SxProp } from '../../types/common';

const RightBottomFab = styled(Fab)(({ theme }) => ({
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

interface Props {
  onClick: () => void;
  sx?: SxProp;
}

const AddNewButton: FC<Props> = ({ onClick, sx }) => {
  return (
    <RightBottomFab onClick={onClick} sx={sx}>
      <AddIcon />
    </RightBottomFab>
  );
};

export default AddNewButton;
