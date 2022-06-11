import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import SyncIcon from "@mui/icons-material/Sync";
import { Link } from "wouter";

export default function NavigationList() {
  return (
    <div>
      <List>
        <ListItem button key="home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link href="/">
            <ListItemText>My Movies</ListItemText>
          </Link>
        </ListItem>
        <ListItem button key="search">
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <Link href="/search">
            <ListItemText>Search</ListItemText>
          </Link>
        </ListItem>
        <ListItem button key="settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Link href="/settings">
            <ListItemText>Settings</ListItemText>
          </Link>
        </ListItem>
        <ListItem button key="sync">
          <ListItemIcon>
            <SyncIcon />
          </ListItemIcon>
          <Link href="/sync">
            <ListItemText>TMDB Sync</ListItemText>
          </Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
