import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import LoginLogout from "./LoginLogout";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerIsVisible(!drawerIsVisible);

  const navigationElements = (
    <div role="presentation" onClick={() => toggleDrawer()}>
      <List>
        <ListItem button key="home">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="imprint">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Imprint</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Treasury
            </Typography>
            <LoginLogout />
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        anchor="left"
        open={drawerIsVisible}
        onClose={() => toggleDrawer()}
      >
        {navigationElements}
      </Drawer>
    </React.Fragment>
  );
}
