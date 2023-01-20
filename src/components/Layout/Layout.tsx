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
          paddingY: '20px',
          paddingLeft: '240px',
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
          <iframe
            frameBorder="0"
            style={{ border: 'none', width: '100%', height: '180px' }}
            width="100%"
            height="180"
            src="https://music.yandex.ru/iframe/#track/40614919/18532304"
          >
            Слушайте{' '}
            <a href="https://music.yandex.ru/album/18532304/track/40614919">
              Electric Boogie
            </a>{' '}
            — <a href="https://music.yandex.ru/artist/5827529">SymphoBreaks</a>{' '}
            на Яндекс Музыке
          </iframe>
          <Outlet />
          <Notification />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
