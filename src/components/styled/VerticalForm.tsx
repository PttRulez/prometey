import { Box, styled } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoxTypeMap } from '@mui/system/Box/Box';

const VerticalForm: OverridableComponent<BoxTypeMap> = styled(Box)(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: 30,
    minWidth: '500px',
  })
);

export default VerticalForm;
