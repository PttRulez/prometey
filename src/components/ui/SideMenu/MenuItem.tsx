import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import * as Muicon from '@mui/icons-material';

interface IMenuItem {
  title: string;
  iconName?: string;
  link?: string;
  children?: IMenuItem[];
}

const IListItemButton = styled(ListItemButton)<
  NavLinkProps & { component: typeof NavLink }
>(({ theme }) => ({
  '&.active': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const IListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));

const CollapsingMenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { title, iconName, children } = item;

  return (
    <>
      {/* <ListItem onClick={() => setOpen(prev => !prev)}> */}
      <ListItemButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{ paddingY: 2 }}
      >
        <IListItemIcon>
          {Muicon[iconName as keyof typeof Muicon] &&
            React.createElement(Muicon[iconName as keyof typeof Muicon])}
        </IListItemIcon>
        <ListItemText primary={title} />
        <IListItemIcon>
          {open ? <Muicon.ExpandLess /> : <Muicon.ExpandMore />}
        </IListItemIcon>
      </ListItemButton>
      {/* </ListItem> */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children!.map((item) => (
          <MenuItem item={item} key={`${item.link} ${item.title}`} />
        ))}
      </Collapse>
    </>
  );
};

const SimpleMenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { link, title, iconName } = item;

  return (
    // <ListItem>
    <IListItemButton component={NavLink} to={link!} sx={{ paddingY: 2 }}>
      <IListItemIcon>
        {Muicon[iconName as keyof typeof Muicon] &&
          React.createElement(Muicon[iconName as keyof typeof Muicon])}
      </IListItemIcon>
      <ListItemText primary={title} />
    </IListItemButton>
    // </ListItem>
  );
};

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  if (item.children) {
    return <CollapsingMenuItem item={item} />;
  } else {
    return <SimpleMenuItem item={item} />;
  }
};

export default MenuItem;
