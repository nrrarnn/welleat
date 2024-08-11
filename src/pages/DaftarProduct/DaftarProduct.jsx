import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Card } from "@nextui-org/react";
import Footer from "../../components/Footer";

const DaftarProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("Semua");
  const [hidden, setHidden] = useState(false);

  const authToken = Cookies.get("authToken");
  const [recipeData, setRecipeData] = useState({
    data: [],
  });
  const username = Cookies.get("username");
  const [showHamMenu, setShowHam] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  const logOut = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(255 10 10)",
    }).then((res) => {
      if (res.isConfirmed) {
        Cookies.remove("username");
        navigate("/login");
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleCategory = (category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        "https://foodrecipesapi.com/all-recipes",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const recipesWithCategory = response.data.data.map((item) => {
        if (item.difficulty === "Easy") {
          item.category = "Easy";
        } else if (item.difficulty === "Medium") {
          item.category = "Medium";
        } else {
          item.category = "Hard";
        }
        return item;
      });

      const filteredRecipes =
        category === "Semua"
          ? recipesWithCategory
          : recipesWithCategory.filter((item) => item.category === category);
      const searchData = searchQuery
        ? filteredRecipes.filter(
            (item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredRecipes;
      setRecipeData((prev) => ({ ...prev, data: searchData }));
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const product = async () => {
          const authToken = Cookies.get("authToken");
          try {
            const response = await axios.get(
              "https://foodrecipesapi.com/all-recipes",
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );

            const recipesWithCategory = response.data.data.map((item) => {
              if (item.difficulty === "Easy") {
                item.category = "Easy";
              } else if (item.difficulty === "Medium") {
                item.category = "Medium";
              } else {
                item.category = "Hard";
              }
              return item;
            });

            const filteredData =
              category === "Semua"
                ? recipesWithCategory
                : recipesWithCategory.filter(
                    (item) => item.category === category
                  );
            const searchData = searchQuery
              ? filteredData.filter(
                  (item) =>
                    item.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item.ingredient
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
              : filteredData;
            setRecipeData((prev) => ({ ...prev, data: searchData }));
          } catch (error) {
            console.error("Error", "Tidak ada Resep", error.message);
          }
        };
        product();
      }
    }
  };

  const clickRecipe = async (id) => {
    if (id) {
      navigate(`/detail-recipe/${id}`, {
        state: {
          id: `${id}`,
        },
      });
    }
  };

  const call = async () => {
    if (username) {
      try {
        const userIdStore = await axios.get(
          `https://foodrecipesapi.com/stores`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const userId = await axios.get(`https://foodrecipesapi.com/users`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (userIdStore.data.data[0].UserID === userId.data.data.UserID) {
          setHidden(true);
        }
      } catch (error) {
        error.message("Terjadi Errors");
      }
    }
  };

  const totalPages = Math.ceil(recipeData.data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipeData.data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!username) {
      Swal.fire({
        title: "Confirmation",
        text: "Anda Harus Login dulu",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      getRecipes();
    }
  }, [searchQuery, recipeData, category]);

  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPagination(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        id="main"
        className="main h-screen w-screen bg-white overflow-y-scroll"
      >
        <div
          id="header"
          className="flex justify-between fixed z-10 w-screen items-center px-4 md:px-28 py-2 md:py-0 bg-white shadow-sm h-[13vh] md:h-[20vh]"
        >
          <h2
            onClick={() => navigate("/")}
            id="storeTitle"
            className="cursor-pointer text-2xl md:block hidden md:text-4xl font-bold text-[#0396C7]"
          >
            RecipeHub
          </h2>
          <div id="menu" className="items-center justify-between gap-5 flex">
            <p
              id="recipeLink"
              onClick={() => navigate("/")}
              className="font-poppins font-normal text-lg font-Poppins text-[#828282] hidden md:block"
            >
              Recipes
            </p>
            <div
              id="userMenu"
              className="m-w-[792px] h-[2.5rem] md:h-[54px] p-2 bg-neutral-100 rounded-lg justify-center items-center gap-1 inline-flex"
            >
              <div id="menuIcon" className="md:flex">
                <svg
                  width="30"
                  className="md:h-auto md:w-auto h-[15px] w-[15px]"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.2451 25.255L21.6799 19.6875C23.3485 17.513 24.1276 14.7853 23.859 12.0575C23.5904 9.32983 22.2943 6.80641 20.2336 4.99917C18.1729 3.19193 15.502 2.2362 12.7625 2.32585C10.0231 2.41551 7.4203 3.54383 5.48219 5.48195C3.54408 7.42006 2.41575 10.0228 2.32609 12.7623C2.23644 15.5017 3.19217 18.1727 4.99941 20.2334C6.80665 22.2941 9.33008 23.5902 12.0578 23.8587C14.7855 24.1273 17.5133 23.3483 19.6877 21.6797L25.2576 27.2507C25.3884 27.3816 25.5437 27.4853 25.7146 27.5561C25.8855 27.6269 26.0687 27.6633 26.2537 27.6633C26.4387 27.6633 26.6219 27.6269 26.7928 27.5561C26.9637 27.4853 27.119 27.3816 27.2498 27.2507C27.3806 27.1199 27.4844 26.9646 27.5552 26.7937C27.626 26.6228 27.6624 26.4396 27.6624 26.2546C27.6624 26.0696 27.626 25.8864 27.5552 25.7155C27.4844 25.5446 27.3806 25.3893 27.2498 25.2585L27.2451 25.255ZM11.25 20.625C10.0527 20.625 8.88258 20.2586 7.91625 19.5714C6.94992 18.8842 6.23276 17.9064 5.8673 16.7828C5.50184 15.6591 5.50461 14.4476 5.87543 13.3266C6.24624 12.2057 6.96753 11.2366 7.93491 10.5539C8.90229 9.87128 10.067 9.5 11.25 9.5C12.9467 9.5 14.5686 10.1719 15.7314 11.3346C16.8941 12.4974 17.566 14.1194 17.566 15.816C17.566 17.5127 16.8941 19.1346 15.7314 20.2974C14.5686 21.4601 12.9467 22.132 11.25 22.132V20.625Z"
                    fill="#828282"
                  />
                </svg>
              </div>
              <input
                id="searchInput"
                type="text"
                placeholder="Cari resep..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-poppins placeholder:font-poppins font-medium text-[10px] md:text-base w-[140px] md:w-[90%] h-[100%] border-none bg-transparent outline-none"
              />
            </div>
            <p
              id="userLink"
              onClick={() => navigate("/user")}
              className="font-poppins font-normal text-lg font-Poppins text-[#828282] hidden md:block"
            >
              {username}
            </p>
            <svg
              id="menuToggle"
              onClick={() => setShowHam(!showHamMenu)}
              className="md:hidden block"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
              fill="#828282"
            >
              <path d="M120 816v-60h720v60H120Zm0-180v-60h720v60H120Zm0-180v-60h720v60H120Z" />
            </svg>
          </div>
        </div>
        <div
          id="hamMenu"
          className={`flex z-20 absolute w-[100%] mt-[80vh] md:mt-[30vh] md:w-[20%] flex-col h-[12rem] md:h-[20rem] right-0 mr-0 md:mr-4 bg-white shadow-sm ${
            showHamMenu ? "block" : "hidden"
          }`}
        >
          <p
            id="recipeLinkHam"
            onClick={() => navigate("/")}
            className="text-center my-3 font-poppins font-normal text-lg font-Poppins text-[#828282]"
          >
            Recipes
          </p>
          <p
            id="userLinkHam"
            onClick={() => navigate("/user")}
            className="text-center my-3 font-poppins font-normal text-lg font-Poppins text-[#828282]"
          >
            {username}
          </p>
          <p
            id="logoutHam"
            onClick={() => logOut()}
            className="text-center my-3 font-poppins font-normal text-lg font-Poppins text-[#828282]"
          >
            Log Out
          </p>
        </div>

        <div
          id="sidebar"
          className="md:flex hidden absolute flex-col w-[25vw] items-center gap-5 py-10 top-[13vh] md:top-[20vh]"
        >
          <div
            id="sidebarHeader"
            className="text-center font-poppins text-[#0396C7] font-semibold text-lg"
          >
            Categories
          </div>
          <div
            id="categories"
            className="w-[70%] md:w-[40%] flex flex-col gap-2"
          >
            <div
              id="categoryAll"
              onClick={() => handleCategory("Semua")}
              className={`category-item ${
                category === "Semua" ? "active" : ""
              }`}
            >
              Semua
            </div>
            <div
              id="categoryEasy"
              onClick={() => handleCategory("Easy")}
              className={`category-item ${category === "Easy" ? "active" : ""}`}
            >
              Easy
            </div>
            <div
              id="categoryMedium"
              onClick={() => handleCategory("Medium")}
              className={`category-item ${
                category === "Medium" ? "active" : ""
              }`}
            >
              Medium
            </div>
            <div
              id="categoryHard"
              onClick={() => handleCategory("Hard")}
              className={`category-item ${category === "Hard" ? "active" : ""}`}
            >
              Hard
            </div>
          </div>
        </div>

        <div
          id="recipes"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-[13vh] md:mt-[20vh] px-4 md:px-28 py-10"
        >
          {currentItems.map((recipe, index) => (
            <Card
              key={index}
              recipe={recipe}
              onClick={() => clickRecipe(recipe.id)}
            />
          ))}
        </div>

        <div
          id="pagination"
          className={`flex justify-center mt-4 ${
            showPagination ? "block" : "hidden"
          }`}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DaftarProduct;
