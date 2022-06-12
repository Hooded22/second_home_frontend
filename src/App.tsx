import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
import AddReservationPage from "./pages/AddReservationPage";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditReservationPage from "./pages/EditReservationPage";
import PageTemplate from "./pages/PageTemplate";
import ReservationDetails from "./pages/ReservationDetails";
import CustomerDetails from "./pages/CustomerDetails";
import RoomDetails from "./pages/RoomDetails";
import AddCustomerPage from "./pages/AddCustomerPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import AddRoomPage from "./pages/AddRoomPage";
import EditRoomPage from "./pages/EditRoomPage";

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage allowJustLogin>
                <PageTemplate pageName="Home">
                  <HomePage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/addReservation"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Add reservation">
                  <AddReservationPage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/editReservation"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Edit reservation">
                  <EditReservationPage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/reservationDetails"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Reservation details">
                  <ReservationDetails />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/customerDetials"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Customer details">
                  <CustomerDetails />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/roomDetails"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Room details">
                  <RoomDetails />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/addCustomer"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Add customer">
                  <AddCustomerPage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/editCustomer"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Edit customer">
                  <EditCustomerPage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/addRoom"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Add room">
                  <AddRoomPage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
          <Route
            path="/editRoom"
            element={
              <ProtectedPage>
                <PageTemplate pageName="Edit room">
                  <EditRoomPage />
                </PageTemplate>
              </ProtectedPage>
            }
          />
        </Routes>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
