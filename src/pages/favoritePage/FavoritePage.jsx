import { useEffect, useState } from "react";

import RecipeCard from "../../components/RecipeCard";
import { getFavByUserId } from "../../data/favorite";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/fetchData";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import axios from "axios";
import withAuth from "../../hoc/withAuth";

function FavoritePage({ token, dataUser }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const idUser = dataUser.id;

  const getFavoriteRecipe = async () => {
    try {
      const response = await axios.get(
        `https://api-resep-three.vercel.app/api/v1/userFavorites/${idUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setRecipes(response.data); 
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
     
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getFavoriteRecipe();
  }, [idUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center py-3 px-20">
        <div className="flex  border-2 p-2 rounded-xl bg-slate-50">
          <div className="flex-col">
            <h2 className="text-center font-poppins text-3xl font-bold text-slate-700">
              Resep Favorit
            </h2>
            <div className="flex flex-wrap justify-center items-center">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.recipesId._id}
                  name={recipe.recipesId.recipeName}
                  id={recipe.recipesId._id}
                  image={recipe.recipesId.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(FavoritePage);
