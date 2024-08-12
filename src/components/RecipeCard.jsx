import { PropTypes } from "prop-types";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipeName, image, id }) {
  const [isRead, setIsRead] = useState(false);

  const redHeartClick = () => {
    setIsRead(!isRead);
  };
  return (
    <div className="m-2">
      <div className="bg-white rounded-lg shadow-lg max-w-[280px] p-2">
        <div className="p-3">
          <img
            className=" w-full h-[220px]  object-cover rounded-lg"
            src={image}
            alt="Card Image"
          />
        </div>
        <div className="p-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{recipeName}</h2>
          <div>
            <div className="flex justify-between">
              <Link
                to={`/detail-recipe/${id}`}
                className="bg-blue-500 text-white px-5 mr-4 py-2 rounded hover:bg-blue-600 active:to-blue-300"
              >
                Lihat Resep
              </Link>
              <button
                onClick={redHeartClick}
                className="bg-white px-8 ml-4 rounded border border-blue-500 hover:text-red-600 hover:bg-blue-500"
              >
                <FaHeart
                  id="heart-fav"
                  className={` text-xl   ${
                    isRead ? "text-red-500" : "text-gray"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
