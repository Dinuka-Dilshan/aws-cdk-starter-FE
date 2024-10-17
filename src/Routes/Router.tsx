import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateSpace from "../Pages/CreateSpace";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Spaces from "../Pages/Spaces";
import Layout from "../components/Layout";
import { ROUTES } from "../constants/Routes";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.SPACES} element={<Spaces />} />
            <Route path={ROUTES.CREATE_SPACE} element={<CreateSpace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
