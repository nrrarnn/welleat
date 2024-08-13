import { fetchingData, postingData } from "../../src/data/fetchData";
import { getComment, postComment } from "../../src/data/comment";
import { useEffect, useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import store from "../store/store";
import { PropTypes } from "prop-types";

const Comment = ({ id }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(5);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchingData(setComments, () => getComment(id));
  }, [id]);

  const state = store.getState();
  const user = JSON.parse(state.users.dataUser);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!newComment.trim()) return;

      const commentar = {
        recipesId: id,
        content: newComment,
        userId: user.id,
      };

      postingData(() => postComment(commentar));

      fetchingData(setComments, () => getComment(id));

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

  if (!comments) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading ..." size="lg" />
      </div>
    );
  } else {
    return (
      <>
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
              comments.slice(0, showComments).map((comment, index) => (
                <div key={index} className="flex items-start space-x-4">
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
      </>
    );
  }
};

export default Comment;
Comment.propTypes = {
  id: PropTypes.string.isRequired,
};
