import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Input, Spinner } from "@nextui-org/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { BiArrowBack } from "react-icons/bi";
import { fetchData, postData } from "../../data/fetchData";
import { getRecipe } from "../../data/recipe";
import { getCommentByRecipeId, postComment } from "../../data/comment";
import { useSelector } from "react-redux";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(5);
  const user = useSelector((state) => state.users.dataUser);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData(setRecipe, setLoading, () => getRecipe(id));
    fetchData(setComments, setLoading, () => getCommentByRecipeId(id));
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newComment.trim()) return;
      console.log("🚀 ~ handleCommentSubmit ~ newComment:", newComment);
      const comment = {
        userId: user.id,
        recipeId: id,
        content: newComment,
      };
      console.log("🚀 ~ handleCommentSubmit ~ comment:", comment);
      postData(setLoading, () => postComment(comment));

      setLoading(false);
      setNewComment("");
    } catch (error) {
      console.log("Error submitting comment:", error);
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
            {comments.length > 0 ? (
              comments.slice(0, showComments).map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User Avatar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                  <div className="text-start">
                    <p className="font-semibold text-gray-700">
                      {user.username}
                    </p>
                    <div className="bg-gray-100 rounded-r-xl rounded-bl-xl p-3 mt-1 max-w-xs shadow-sm">
                      <p className="text-gray-800">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Komen tidak ada</p>
            )}
          </div>
          {/* Show More Button */}

          {showComments < comments.length && (
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
