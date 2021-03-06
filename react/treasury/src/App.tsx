import React from 'react';
import Menu from './menu/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// FIXME colors suck, need something dark and pastel
// current palette #525252 #414141 #313131 #CA3E47
// need to check after more components have been added
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
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Menu />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
