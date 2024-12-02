import "./App.css";
import axios from "axios";
import AppRoutes from "./AppRoutes";
import AppContextProvider from "../context/AppContext";
function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
}

export default App;
