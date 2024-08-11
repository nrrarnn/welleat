import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import DetailRecipe from "./pages/detailRecipePages/DetailRecipe";
import FavoritePage from "./pages/favoritePage/FavoritePage";
import UserCard from "./pages/userPage/UserCard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DaftarProduct from "./pages/DaftarProduct/DaftarProduct";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<DetailRecipe />} path="/detail-recipe/:id" />
        <Route element={<FavoritePage />} path="/favorite" />
        <Route element={<UserCard />} path="/user" />
        <Route element={<Register />} path="/register" />
        <Route element={<DaftarProduct />} path="/daftar-product" />
      </Routes>
    </>
  );
}

export default App;
