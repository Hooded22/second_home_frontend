import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import LoginPage from "./pages/LoginPage";

const theme = createTheme({
  palette: {
    background: {
      default: "#E4E6E5",
    },
    primary: {
      light: "#757ce8",
      main: "#172121",
      dark: "#d0d8d3",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: "#3f50b5",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
