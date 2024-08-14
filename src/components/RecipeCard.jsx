import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import store from "../store/store";
import {
  createFavorite,
  deleteFavorite,
  getFavByUserId,
} from "../data/favorite";

export default function RecipeCard({ name, image, id, isRed, setRecipe }) {
  const [isRead, setIsRead] = useState(isRed);
  const state = store.getState();
  const user = state.users.dataUser;
  // const token = state.auth.token;
  const idUser = user.id;

  useEffect(() => {
    setIsRead(isRed);
  }, [isRed]);

  const redHeartClick = async () => {
    try {
      if (!isRead) {
        if (id === null) {
          Swal.fire({
            title: "Gagal",
            text: `Resep Tidak ada`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(3 150 199)",
          });
        }
        const response = await createFavorite(id, idUser);

        console.log(response.message);
        Swal.fire({
          title: "Success",
          text: `${response.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        });
        setIsRead(true);
      } else {
        if (id === null) {
          Swal.fire({
            title: "Gagal",
            text: `Resep Tidak ada`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(3 150 199)",
          });
        }
        const response = await deleteFavorite(id, idUser);
        const responseGet = await getFavByUserId(idUser);
        setRecipe(responseGet);

        Swal.fire({
          title: "Delete Success",
          text: `${response.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        });
        setIsRead(false);
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
  setRecipe: PropTypes.func,
  isRed: PropTypes.bool,
};
