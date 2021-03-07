import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import HomeIcon from "@material-ui/icons/Home";

export default function NavigationList() {
  return (
    <div>
      <List>
        <ListItem button key="home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="imprint">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText>Imprint</ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
