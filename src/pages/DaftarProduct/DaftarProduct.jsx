import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeCard from "../favoritePage/RecipeCard";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hoc/withAuth";
import SearchForm from "../../components/SearchForm";
import { PropTypes } from "prop-types";
import { NoDataDisplay } from "../../components/NoDataDisplay";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/baseAxios";
import { getRecipes } from "../../data/recipe";

const DaftarProduct = ({ token }) => {
  const [listRecipes, setListRecipes] = useState([]);
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

  return (
    <>
      <Header />

      <div className="flex flex-wrap gap-3 px-20">
        {listRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipeName={recipe.name}
            image={recipe.image}
            id={recipe.id}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default withAuth(DaftarProduct);
