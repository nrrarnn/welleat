import Register from "./pages/Auth/Register";
import DaftarProduct from "./pages/DaftarProduct/DaftarProduct";
import HomePageUser from "./pages/userPage/HomePageUser";
import DashboardPage from "./pages/dashboardAdmin/DashboardPage";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Layout from "./layout/Layout";
import Error404 from "./pages/errorPage/Error404";
import LayoutUser from "./layout/LayoutUser";
import AdminRoute from "./pages/Auth/adminRoute";
import Error403 from "./pages/errorPage/Error403";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DetailRecipe from "./pages/detailRecipePages/DetailRecipe";
import FavoritePage from "./pages/favoritePage/FavoritePage";
import HomePage from "./pages/homepage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} path="/">
          {/* public routes */}
          <Route index element={<HomePage />} />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<HomePageUser />} path="/homepage-user" />
            <Route element={<AdminRoute />}>
              <Route element={<DashboardPage />} path="/dashboard-admin" />
            </Route>

            <Route element={<LayoutUser />}>
              <Route element={<DetailRecipe />} path="/detail-recipe/:id" />
              <Route element={<FavoritePage />} path="/favorite" />
              <Route element={<DaftarProduct />} path="/daftar-product" />
              <Route element={<DetailRecipe />} path="/detail/:id" />
            </Route>
          </Route>
        </Route>
        <Route element={<Error403 />} path="/forbidden" />
        <Route element={<Error404 />} path="*" />
        <Route element={<Register />} path="/register" />
        <Route element={<DaftarProduct />} path="/daftar-product" />
      </Routes>
    </>
  );
}
export default App;
