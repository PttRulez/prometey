import { Box, Container, CssBaseline } from '@mui/material';
import SideMenu from '../SideMenu/SideMenu';
import Notification from '../ui/Notification';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
          paddingY: '20px',
          paddingLeft: '240px',
        }}
      >
        <SideMenu />
        <Container maxWidth="xl" sx={{ mt: 3, minHeight: '100%' }}>
          <Outlet />
          <Notification />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
