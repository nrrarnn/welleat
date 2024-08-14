import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getRecipe } from "../../data/recipe";
import { Button, Spinner } from "@nextui-org/react";
import { fetchData } from "../../data/fetchData";
import Comment from "../../components/Comment";
const DetailRecipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    fetchData(setRecipe, setLoading, () => getRecipe(id));
  }, [id]);

  if (!recipe || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  }
  return (
    <>
      <div className="sm:p-8 lg:px-32 font-poppins">
        <div className="hidden sm:flex justify-between items-center mb-8 bg-blue-100 rounded-full">
          <Link to="/daftar-product">
            <Button radius="full" className="bg-sky-500 w-12 h-12">
              <BiArrowBack className="text-white w-6 h-6" />
            </Button>
          </Link>
          <div className="">
            <h2 className="mr-6">Kembali</h2>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-4">
              <img
                src={recipe.image}
                alt={recipe.recipeName}
                className="rounded-md w-full"
              />
            </div>
            <div className="p-4 flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                {recipe.recipeName}
              </h1>
              <div className="text-start">
                <h2 className="text-lg lg:text-xl font-semibold mb-2">Bahan</h2>
                <ol>
                  {recipe.ingredient.map((item, index) => (
                    <li key={index} className="list-decimal list-inside">
                      {item}
                    </li>
                  ))}
                </ol>
                <h2 className="text-lg lg:text-xl font-semibold mt-6 mb-2">
                  Langkah - langkah
                </h2>
                <ol>
                  {recipe.step.map((item, index) => (
                    <li key={index} className="list-decimal list-inside">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <Comment id={id} />
      </div>
    </>
  );
};

export default DetailRecipe;
