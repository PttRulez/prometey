import { FC } from 'react';
import { AppBar, List, styled } from '@mui/material';

import menu from './menu';
import MenuItem from './MenuItem';
import { useAppSelector } from '../../hooks/redux';

const SideMenu: FC = () => {
  const { authenticated } = useAppSelector(state => state.auth);
  return (
    <AppBar
      component='aside'
      sx={{
        bgcolor: 'secondary.dark',
        height: '100%',
        width: 240,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          // backgroundColor: 'rgba(0,0,0,.1)',
          backgroundColor: 'secondary.light',
          outline: '1px solid slategrey',
        },
      }}
    >
      <List component='nav' sx={{ padding: 0 }}>
        {authenticated &&
          menu.map(item => {
            return <MenuItem item={item} key={`${item.link} ${item.title}`} />;
          })}
      </List>
    </AppBar>
  );
};

export default SideMenu;
