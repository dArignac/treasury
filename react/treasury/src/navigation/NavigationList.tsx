import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
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
            <ListItemText>Home</ListItemText>
          </Link>
        </ListItem>
      </List>
      <Divider />
      {/* other entries go here */}
    </div>
  );
}
