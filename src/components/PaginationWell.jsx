const [loading, setLoading] = useState(true);
const [view, setView] = useState("list");
const [results, setResults] = useState([]);
const [currentPage, setCurrentPage] = useState(1); // Current page state
const [itemsPerPage] = useState(5); // Items per page

useEffect(() => {
  fetchData(setListRecipes, setLoading, getRecipes);

@@ -27,11 +29,25 @@ const DaftarProduct = () => {
  );

  setResults(filteredResults);

  setView("result");
  setCurrentPage(1); // Reset to the first page on new search
  setLoading(false);
};

// Get current recipes based on pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const paginatedRecipes =
  view === "list"
    ? listRecipes.slice(indexOfFirstItem, indexOfLastItem)
    : results.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(
  (view === "list" ? listRecipes.length : results.length) / itemsPerPage
);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen"></div>
)}
const DaftarProduct = () => {
return (
  <>
    <SearchForm onSearch={handleSearch} />
    <div className=" px-20">
    <div className="px-20">
      <div>
        <h2 className="text-center text-3xl p-4 font-poppins font-extrabold text-blue-400">
          DAFTAR RESEP
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {/* {view === "list" &&
          (listRecipes.length > 0 ? (
            listRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                name={recipe.recipeName}
                image={recipe.image}
                id={recipe._id}
              />
            ))
          ) : (
            <NoDataDisplay />
          ))}

        {view === "result" &&
          (results.length > 0 ? (
            results.map((recipe, index) => (
              <RecipeCard
                key={index}
                name={recipe.recipeName}
                image={recipe.image}
                id={recipe._id}
              />
            ))
          ) : (
            <NoDataDisplay /> */}
        {paginatedRecipes.length > 0 ? (
          paginatedRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              name={recipe.recipeName}
              image={recipe.image}
              id={recipe._id}
            />
          ))
        ) : (
          <NoDataDisplay />
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <ul className="flex list-none">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`mx-1 ${
                currentPage === index + 1 ? "font-bold" : ""
              }`}
            >
              <button
                onClick={() => paginate(index + 1)}
                className="px-4 py-2 border rounded"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);
};

export default DaftarProduct;