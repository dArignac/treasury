import { Drawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import React, { useState } from "react";
import { Route } from "wouter";
import LoginLogout from "./LoginLogout";
import NavigationList from "./NavigationList";

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

export default function NavigationPanel() {
  const classes = useStyles();
  const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerIsVisible(!drawerIsVisible);

  const navigationElements = (
    <div onClick={() => toggleDrawer()}>
      <NavigationList />
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
              <React.Fragment>
                Treasury
                <IfFirebaseAuthed>
                  {() => (
                    <React.Fragment>
                      <Route path="/"> - Movies</Route>
                    </React.Fragment>
                  )}
                </IfFirebaseAuthed>
                {/* other routes go here */}
              </React.Fragment>
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
