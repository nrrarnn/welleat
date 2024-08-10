import { FaHeart } from "react-icons/fa";

export default function RecipeCard() {
  const imgUrl =
    "https://peasandcrayons.com/wp-content/uploads/2016/08/Blueberry-Broccoli-Spinach-Salad-Poppyseed-Ranch-dressing-recipe-7143.jpg";
  return (
    <card>
      <div className="bg-white rounded-lg shadow-lg max-w-[280px] p-2">
        <div className="p-3">
          <img
            className=" w-full h-[220px]  object-cover rounded-lg"
            src={imgUrl}
            alt="Card Image"
          />
        </div>
        <div className="p-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Salad Sayur</h2>
          <div>
            <div className="flex justify-between">
              <a
                href="#"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                DLihat Resep
              </a>
              <button className="bg-white px-8 rounded border border-blue-500 hover:text-red-600 hover:bg-blue-500">
                <FaHeart className=" text-xl active:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </card>
  );
}
