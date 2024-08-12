import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Input, Spinner } from "@nextui-org/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(5);

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist/${id}`
        );
        setRecipe(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipeDetails();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist/${id}/comment`,
        {
          username: "Current User",
          body: newComment,
          createdAt: new Date().toISOString(),
        }
      );

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        comment: [...prevRecipe.comment, response.data],
      }));

      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMoreComments = () => {
    setShowComments((prevShowComments) => prevShowComments + 3);
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="sm:p-8 lg:px-32 font-poppins">
        <div className="hidden sm:flex justify-between items-center mb-8 bg-blue-100 rounded-full">
          <Button radius="full" className="bg-sky-500 w-12 h-12">
            <BiArrowBack className="text-white w-6 h-6" />
          </Button>
          <div className="">
            <h2 className="mr-6">Kembali</h2>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-4">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="rounded-md w-full"
              />
            </div>
            <div className="p-4 flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                {recipe.name}
              </h1>
              <div className="text-start">
                <h2 className="text-lg lg:text-xl font-semibold mb-2">Bahan</h2>
                <ul>{recipe.bahan}</ul>
                <h2 className="text-lg lg:text-xl font-semibold mt-6 mb-2">
                  Langkah - langkah
                </h2>
                <ol className="list-decimal list-inside">{recipe.step}</ol>
              </div>
            </div>
          </div>
        </div>

        {/* Section Komentar */}
        <div className="bg-white rounded-md shadow-md mt-8 p-6 sm:p-8 lg:p-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-start">
            Komentar
          </h2>

          {/* Comment Form */}
          <form
            className="mb-4 flex items-center space-x-4"
            onSubmit={handleCommentSubmit}
          >
            <img
              src="https://via.placeholder.com/50"
              alt="User Avatar"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
            <div className="flex-grow">
              <Input
                label="Komentar"
                radius="full"
                value={newComment}
                onChange={handleCommentChange}
                disabled={loading}
              />
            </div>
            <Button
              radius="full"
              className="h-10 sm:h-12 bg-sky-400 text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Kirim"}
            </Button>
          </form>

          {/* Displaying Comments */}
          <div className="space-y-4 mt-8">
            {recipe.comment.slice(0, showComments).map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User Avatar"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div className="text-start">
                  <p className="font-semibold text-gray-700">
                    {comment.username}
                  </p>
                  <div className="bg-gray-100 rounded-r-xl rounded-bl-xl p-3 mt-1 max-w-xs shadow-sm">
                    <p className="text-gray-800">{comment.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {showComments < recipe.comment.length && (
            <div className="text-center mt-4">
              <Button radius="full" onClick={handleShowMoreComments}>
                Show More
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailRecipe;
