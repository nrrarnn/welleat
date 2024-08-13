import axios from "axios";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function RecipeCard({ name, image, id }) {
  const [isRead, setIsRead] = useState(false);
  const userId = useSelector((state) => state.users.dataUser.id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchFavorites = async () => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          `https://api-resep-three.vercel.app/api/v1/userFavorites/${userId}`,
          config
        );
        
        const favorites = response.data;
        
        const isFavorite = favorites.some(fav => fav.recipesId._id === id);
        setIsRead(isFavorite);
        
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userId, id, token]);
  
   const redHeartClick = async () => {
    const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

    try {
      if (!isRead) {  
        const response = await axios.post('https://api-resep-three.vercel.app/api/v1/addFavorite', {
          userId: userId,
          recipesId: id
        }, config);
        console.log(response.data.message);
        Swal.fire({
          title: "Success",
          text: `${response.data.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)"})
          setIsRead(true)
      } else { 
        const response = await axios.delete(`https://api-resep-three.vercel.app/api/v1/removeFavorite`,config);
        console.log(response.data.message);
        Swal.fire({
          title: "Delete Success",
          text: `${response.data.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)"})
          setIsRead(false)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  return (
    <div className="m-2">
      <div className="bg-white rounded-lg shadow-lg max-w-[280px] p-2">
        <div className="p-3">
          <img
            className=" w-full h-[220px]  object-cover rounded-lg"
            src={`${image}`}
            alt="Card Image"
          />
        </div>
        <div className="p-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{name}</h2>
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
