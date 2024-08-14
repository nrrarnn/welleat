import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import store from "../../store/store";

function FavoritePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const state = store.getState();
  const user = state.users.dataUser;
  const token = state.auth.token;
  const idUser = user.id

  const getFavoriteRecipe = async () => {
    try {
      const response = await axios.get(
        `https://api-resep-three.vercel.app/api/v1/userFavorites/${idUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setRecipes(response.data); 
      console.log(response.data)
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
              {recipes
                .filter((recipe) => recipe.recipesId !== null) // Filter out any entries where recipesId is null
                .map((recipe) => (
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

export default FavoritePage;
