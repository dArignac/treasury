import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import SyncIcon from "@material-ui/icons/Sync";
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
