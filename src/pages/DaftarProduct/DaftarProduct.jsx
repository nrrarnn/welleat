import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeCard from "../favoritePage/RecipeCard";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hoc/withAuth";
<<<<<<< Updated upstream
=======
import SearchForm from "../../components/SearchForm";
import { PropTypes } from "prop-types";
import { NoDataDisplay } from "../../components/NoDataDisplay";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/baseAxios";
import { getRecipes } from "../../data/recipe";
>>>>>>> Stashed changes


const DaftarProduct = ({token}) => {
 
  const [listRecipes, setListRecipes] = useState([]);
  const navigate = useNavigate()

<<<<<<< Updated upstream
  const getRecipes = async () => {
    try {
      const response = await axios.get("https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist");
      setListRecipes(response.data)
      console.log(response.data)

    }catch(error){
      console.log(error)
    }
  }

 useEffect(() => {
=======
  useEffect(() => {
    fetchData(setListRecipes, setLoading, getRecipes);
  }, []);

  useEffect(() => {
>>>>>>> Stashed changes
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
    <Header/>

        <div className="flex flex-wrap gap-3 px-20">
            {
              listRecipes.map((recipe,index) => (
                <RecipeCard key={index} recipeName={recipe.name} image={recipe.image} id={recipe.id} />
              ))
            }
          </div>
      <Footer/>
    </>
  );
};

export default withAuth(DaftarProduct);
