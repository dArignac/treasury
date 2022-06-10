import CssBaseline from "@material-ui/core/CssBaseline";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { initFirebase } from "./firebase";
import Wrapper from "./Wrapper";

initFirebase();
const queryClient = new QueryClient();

// current palette #525252 #414141 #313131 #CA3E47
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#525252",
    },
    secondary: {
      main: "#ca3e47",
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Wrapper />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
