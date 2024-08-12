import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeCard from "../favoritePage/RecipeCard";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hoc/withAuth";


const DaftarProduct = ({token}) => {
 
  const [listRecipes, setListRecipes] = useState([]);
  const navigate = useNavigate()

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
