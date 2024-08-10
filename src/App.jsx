import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import DetailRecipe from "./pages/detailRecipePages/DetailRecipe";
import FavoritePage from "./pages/favoritePage/FavoritePage";
import UserCard from "./pages/userPage/UserCard";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<DetailRecipe />} path="/detail-recipe" />
        <Route element={<FavoritePage />} path="/favorite" />
        <Route element={<UserCard />} path="/user" />
      </Routes>
    </>
  );
}

export default App;
