import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
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
      <List>
        <ListItem button key="imprint">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <Link href="/imprint">
            <ListItemText>Imprint</ListItemText>
          </Link>
        </ListItem>
      </List>
    </div>
  );
}
