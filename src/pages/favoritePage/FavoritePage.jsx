import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";
import { getRecipes } from "../data/recipe";

export default function FavoritePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipes();
      console.log(data);

      setRecipes(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="text-black bg-black mt-12">
        <h2 className="text-black">Resep Favorit</h2>
      </div>
      <div className="h-screen flex justify-center items-center ">
        <div className="flex border-2 p-2 rounded-xl bg-slate-100">
          {recipes.map((recipe) => {
            <RecipeCard key={recipe.id} recipeName={recipe.recipeName} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
