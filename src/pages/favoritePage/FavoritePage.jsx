import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";

export default function FavoritePage() {
  return (
    <>
      <Header />
      <div className="text-black bg-black mt-12">
        <h2 className="text-black">Resep Favorit</h2>
      </div>
      <div className="h-screen flex justify-center items-center ">
        <div className="flex border-2 p-2 rounded-xl bg-slate-100">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
      <Footer />
    </>
  );
}
