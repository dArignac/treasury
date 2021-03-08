import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
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
      </List>
      <Divider />
    </div>
  );
}
