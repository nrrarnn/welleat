import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import SearchForm from "../../components/SearchForm";

import { NoDataDisplay } from "../../components/NoDataDisplay";
import { Spinner } from "@nextui-org/react";
import { fetchingData } from "../../data/fetchData";
import { getRecipes } from "../../data/recipe";
import { getFavByUserId } from "../../data/favorite";
import store from "../../store/store";

const DaftarProduct = () => {
  const [listRecipes, setListRecipes] = useState([]);
  const [view, setView] = useState("list");
  const [results, setResults] = useState([]);
  const [ListFav, setListFav] = useState([]);

  const state = store.getState();
  const idUser = state.users.dataUser.id;

  useEffect(() => {
    fetchingData(setListRecipes, getRecipes);
    fetchingData(setListFav, () => getFavByUserId(idUser));
  }, [idUser]);

  const handleSearch = (query) => {
    const filteredResults = listRecipes.filter((recipe) =>
      recipe.ingredient.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );

    setResults(filteredResults);

    setView("result");
  };

  if (!ListFav || !listRecipes) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  } else {
    const otherRecipesIds = new Set(
      ListFav.map((recipe) => recipe.recipesId._id)
    );
    console.log("🚀 ~ DaftarProduct ~ otherRecipesIds:", otherRecipesIds);
    return (
      <>
        <SearchForm onSearch={handleSearch} />
        <div className=" px-20">
          <div>
            <h2 className="text-center text-3xl p-4 font-poppins font-extrabold text-blue-400">
              DAFTAR RESEP
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {view === "list" &&
              (listRecipes.data ? (
                listRecipes.data.map((recipe, index) => {
                  console.log(
                    "🚀 ~ listRecipes.data.map ~ recipe:",
                    otherRecipesIds.has(recipe._id)
                  );
                  return (
                    <RecipeCard
                      key={index}
                      name={recipe.recipeName}
                      image={recipe.image}
                      id={recipe._id}
                      setRecipe={setListFav}
                      isRed={otherRecipesIds.has(recipe._id)}
                    />
                  );
                })
              ) : (
                <NoDataDisplay />
              ))}

            {view === "result" &&
              (results.length > 0 ? (
                results.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    name={recipe.recipeName}
                    image={recipe.image}
                    id={recipe._id}
                    setRecipe={setListFav}
                    isRed={otherRecipesIds.has(recipe._id)}
                  />
                ))
              ) : (
                <NoDataDisplay />
              ))}
          </div>
        </div>
      </>
    );
  }
};

export default DaftarProduct;
