import { Box, BoxTypeMap, styled } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const VerticalForm: OverridableComponent<BoxTypeMap> = styled(Box)(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: 30,
  })
);

export default VerticalForm;
