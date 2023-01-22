import { Box, Container, CssBaseline } from '@mui/material';
import SideMenu from '../ui/SideMenu/SideMenu';
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
          paddingLeft: '240px',
          '& .MuiInput-root': {
            minHeight: '40px',
          },
        }}
      >
        <SideMenu />
        <Container
          // maxWidth="xl"
          // sx={}
          sx={{
            mt: 3,
            minHeight: '100%',
            paddingBottom: '100px',
            '&.MuiContainer-root': {
              // width: 'fit-content',
              maxWidth: '95%',
              // overflowX: 'auto',
            },
          }}
        >
          <Outlet />
          <Notification />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
