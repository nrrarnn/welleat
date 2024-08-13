import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeCard from "../../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hoc/withAuth";
import SearchForm from "../../components/SearchForm";
import { PropTypes } from "prop-types";
import { NoDataDisplay } from "../../components/NoDataDisplay";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/fetchData";
import { getRecipes } from "../../data/recipe";

const DaftarProduct = ({ token }) => {
  const [listRecipes, setListRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(setListRecipes, setLoading, getRecipes);
  }, []);

  useEffect(() => {
    if (!token) {
      // If no token is present, redirect to the login page
      navigate("/login");
    } else {
      // Fetch the recipes if the token is present
      getRecipes();
    }
  }, [token]);

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
      <Header />
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
                <RecipeCard key={index} {...recipe} />
              ))
            ) : (
              <NoDataDisplay />
            ))}

          {view === "result" &&
            (results.length > 0 ? (
              results.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipeName={recipe.name}
                  image={recipe.image}
                  id={recipe.id}
                />
              ))
            ) : (
              <NoDataDisplay />
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default withAuth(DaftarProduct);

DaftarProduct.propTypes = {
  token: PropTypes.any.isRequired,
};
