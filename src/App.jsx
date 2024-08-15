import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

const Register = lazy(() => import("./pages/Auth/Register"));
const DaftarProduct = lazy(() => import("./pages/DaftarProduct/DaftarProduct"));
const HomePageUser = lazy(() => import("./pages/userPage/HomePageUser"));
const DashboardPage = lazy(() =>
  import("./pages/dashboardAdmin/DashboardPage")
);
const ProtectedRoute = lazy(() => import("./pages/Auth/ProtectedRoute"));
const Layout = lazy(() => import("./layout/Layout"));
const Error404 = lazy(() => import("./pages/errorPage/Error404"));
const LayoutUser = lazy(() => import("./layout/LayoutUser"));
const AdminRoute = lazy(() => import("./pages/Auth/AdminRoute"));
const Error403 = lazy(() => import("./pages/errorPage/Error403"));
const Login = lazy(() => import("./pages/Auth/Login"));
const DetailRecipe = lazy(() =>
  import("./pages/detailRecipePages/DetailRecipe")
);
const FavoritePage = lazy(() => import("./pages/favoritePage/FavoritePage"));
const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const PublicRoute = lazy(() => import("./pages/Auth/PublicRoute"));
const UserRoute = lazy(() => import("./pages/Auth/UserRoute"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spinner label="Loading ..." size="lg" />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />} path="/">
          {/* public routes */}
          <Route index element={<HomePage />} />
          {/* Larangan akses yang sudah Login */}
          <Route element={<PublicRoute />}>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Route>

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserRoute />}>
              <Route element={<HomePageUser />} path="/homepage-user" />
            </Route>
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
    </Suspense>
  );
}

export default App;
