import { FC, ReactNode } from 'react';
import { Link, SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  sx?: SxProps;
  to: string;
};

const MyLink: FC<Props> = ({ children, sx, to }) => {
  return (
    <Link component={RouterLink} to={to} sx={{ textDecoration: 'none', ...sx }}>
      {children}
    </Link>
  );
};

export default MyLink;
