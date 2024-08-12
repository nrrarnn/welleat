import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
<<<<<<< Updated upstream
import RecipeCard from "./RecipeCard";
import { getRecipes } from "../data/recipe";
=======
import RecipeCard from "../../components/RecipeCard";
import { getFavorite, getRecipes } from "../../data/recipe";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/baseAxios";
>>>>>>> Stashed changes

export default function FavoritePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchData(setRecipes, setLoading, getRecipes);
    fetchData(setFavorites, setLoading, getFavorite);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center py-3 px-20">
        <div className="flex  border-2 p-2 rounded-xl bg-slate-50">
          <div className="flex-col">
            <h2 className="text-center font-poppins text-3xl font-bold text-slate-700">
              Resep Favorit
            </h2>
            <div className="flex flex-wrap justify-center items-center">
              {recipes
                .filter((recipe) =>
                  favorites.some((favorite) => favorite.recipeId === recipe.id)
                )
                .map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
