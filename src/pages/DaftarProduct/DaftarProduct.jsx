import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import SearchForm from "../../components/SearchForm";

import { NoDataDisplay } from "../../components/NoDataDisplay";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/fetchData";
import { getRecipes } from "../../data/recipe";

const DaftarProduct = () => {
  const [listRecipes, setListRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData(setListRecipes, setLoading, getRecipes);
  }, []);

  const handleSearch = (query) => {
    setLoading(true);

    const filteredResults = listRecipes.filter((recipe) =>
      recipe.ingredient.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );

    setResults(filteredResults);

    setView("result");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  }

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
            (listRecipes.length > 0 ? (
              listRecipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  name={recipe.recipeName}
                  image={recipe.image}
                  id={recipe._id}
                />
              ))
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
                />
              ))
            ) : (
              <NoDataDisplay />
            ))}
        </div>
      </div>
    </>
  );
};

export default DaftarProduct;
