import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";
import { getFavByUserId } from "../../data/favorite";
import { Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/baseAxios";
import { useSelector } from "react-redux";

export default function FavoritePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.users.dataUser.id);

  useEffect(() => {
    fetchData(setRecipes, setLoading, () => getFavByUserId(userId));
  }, [userId]);

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
      <div className="flex justify-center items-center py-3 px-20">
        <div className="flex  border-2 p-2 rounded-xl bg-slate-50">
          <div className="flex-col">
            <h2 className="text-center font-poppins text-3xl font-bold text-slate-700">
              Resep Favorit
            </h2>
            <div className="flex flex-wrap justify-center items-center">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
