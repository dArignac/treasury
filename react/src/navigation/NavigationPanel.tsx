import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import LoginLogout from "./LoginLogout";
import NavigationList from "./NavigationList";

const DivRoot = styled("div")(({ theme }) => ({
  flexGrow: 1,
}));

export default function NavigationPanel() {
  const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerIsVisible(!drawerIsVisible);

  const navigationElements = (
    <div onClick={() => toggleDrawer()}>
      <NavigationList />
    </div>
  );

  return (
    <header>
      <DivRoot>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ marginRight: 2 }}
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <React.Fragment>
                Treasury
                {/* <Route path="/"> - Movies</Route> */}
              </React.Fragment>
            </Typography>
            <LoginLogout />
          </Toolbar>
        </AppBar>
      </DivRoot>
      <Drawer
        anchor="left"
        open={drawerIsVisible}
        onClose={() => toggleDrawer()}
      >
        {navigationElements}
      </Drawer>
    </header>
  );
}
