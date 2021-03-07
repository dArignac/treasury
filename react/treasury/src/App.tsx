import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import firebaseConfig from './auth/config';
import Menu from './menu/Menu';

// current palette #525252 #414141 #313131 #CA3E47
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#525252'
    },
    secondary: {
      main: '#ca3e47'
    }
  },
});

function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <CssBaseline />  
      <ThemeProvider theme={theme}>
        <Menu />
      </ThemeProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
