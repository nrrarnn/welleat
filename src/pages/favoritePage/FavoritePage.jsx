import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import { Spinner } from "@nextui-org/react";
import store from "../../store/store";
import { getFavByUserId } from "../../data/favorite";
import { fetchingData } from "../../data/fetchData";

function FavoritePage() {
  const [favRecipe, setfavRecipe] = useState([]);
  const state = store.getState();
  const user = state.users.dataUser;
  const idUser = user.id;

  useEffect(() => {
    fetchingData(setfavRecipe, () => getFavByUserId(idUser));
    console.log("🚀 ~ useEffect ~ idUser:", idUser);
  }, [idUser]);

  if (!favRecipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center py-3 px-20">
          <div className="flex  border-2 p-2 rounded-xl bg-slate-50">
            <div className="flex-col">
              <h2 className="text-center font-poppins text-3xl font-bold text-slate-700">
                Resep Favorit
                {console.log("🚀 ~ FavoritePage ~ favRecipe:", favRecipe)}
              </h2>
              <div className="flex flex-wrap justify-center items-center">
                {favRecipe.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    name={recipe.recipesId.recipeName}
                    id={recipe.recipesId._id}
                    image={recipe.recipesId.image}
                    setRecipe={setfavRecipe}
                    isRed={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FavoritePage;
