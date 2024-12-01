import { useContext } from "react";
import Feed from "./pages/Feed";
import { appContext } from "../context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";

export default function AppRoutes() {
  const { user, isLoading } = useContext(appContext);

  if (isLoading) {
    return <p>Loading...</p>;
  } else
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<Feed />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
