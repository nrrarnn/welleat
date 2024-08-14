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
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(5); // Items per page

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
    setCurrentPage(1); // Reset to the first page on new search
    setLoading(false);
  };

  // Get current recipes based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedRecipes =
    view === "list"
      ? listRecipes.slice(indexOfFirstItem, indexOfLastItem)
      : results.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (view === "list" ? listRecipes.length : results.length) / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
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

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <div className="px-20">
        <div>
          <h2 className="text-center text-3xl p-4 font-poppins font-extrabold text-blue-400">
            DAFTAR RESEP
          </h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {paginatedRecipes.length > 0 ? (
            paginatedRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                name={recipe.recipeName}
                image={recipe.image}
                id={recipe._id}
              />
            ))
          ) : (
            <NoDataDisplay />
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <ul className="flex list-none">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`mx-1 ${
                  currentPage === index + 1 ? "font-bold" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="px-4 py-2 border rounded"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DaftarProduct;
