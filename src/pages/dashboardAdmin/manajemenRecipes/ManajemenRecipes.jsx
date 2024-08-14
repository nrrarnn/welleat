import { IoMdAdd } from "react-icons/io";
import ListRecipes from "./ListRecipes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddRecipeModal from "./AddRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { deleteRecipe, getRecipes } from "../../../data/recipe";
import DetailRecipeModal from "./DetailRecipeModal";
import { Spinner } from "@nextui-org/react";

const ManajemenRecipes = () => {
	const [listRecipes, setListRecipes] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [recipeToDelete, setRecipeToDelete] = useState(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [showModalCreate, setShowModalCreate] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [recipeToEdit, setRecipeToEdit] = useState(null);
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [recipeToView, setRecipeToView] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const recipesPerPage = 10;

	const getRecipesData = async () => {
		try {
			setLoading(true);
			const response = await getRecipes();
			setListRecipes(response.data);
			setFilteredRecipes(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getRecipesData();
	}, []);

	useEffect(() => {
		const filtered = listRecipes.filter(recipe =>
			recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredRecipes(filtered);
		setCurrentPage(1);
	}, [searchQuery, listRecipes]);

	// Pagination
	const indexOfLastRecipe = currentPage * recipesPerPage;
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
	const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
	const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handlePrevPage = () => {
		setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
	};

	const handleDelete = async () => {
		try {
			await deleteRecipe(recipeToDelete);
			Swal.fire({
				title: "Berhasil",
				text: "Recipe deleted successfully",
				icon: "success",
			});
			setDeleteModalVisible(false);
			getRecipesData();
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: error.response?.data?.message || "Something went wrong",
				icon: "error",
			});
		}
	};

	const handleDeleteClick = (id) => {
		setRecipeToDelete(id);
		setDeleteModalVisible(true);
	};

	const handleEditClick = (recipe) => {
		setRecipeToEdit(recipe);
		setEditModalVisible(true);
	};

	const handleDetailClick = (recipe) => {
		setRecipeToView(recipe);
		setDetailModalVisible(true);
	};

	return (
		<>
			<div className="p-8 font-poppins">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h1 className="font-bold text-slate-800 text-2xl">Daftar Resep</h1>
						<p className="text-slate-600 text-sm">
							Lihat informasi mengenai resep
						</p>
					</div>
					<button
						onClick={() => setShowModalCreate(true)}
						className="flex items-center ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
					>
						<IoMdAdd className="mr-2" /> Add
					</button>
				</div>

				<div className="mb-4">
					<input
						type="text"
						placeholder="Search recipes..."
						className="p-2 border border-gray-300 rounded-lg w-full"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				{loading ? (
					<div className="flex items-center justify-center h-screen">
						<Spinner label="Loading ..." size="lg" />
					</div>
				) : (
					currentRecipes.map((recipe) => (
						<ListRecipes
							key={recipe._id}
							id={recipe._id}
							name={recipe.recipeName}
							img={recipe.image}
							bahan={recipe.ingredient}
							onDelete={() => handleDeleteClick(recipe._id)}
							onEdit={() => handleEditClick(recipe)}
							onDetail={() => handleDetailClick(recipe)}
						/>
					))
				)}

				<div className="flex items-center gap-4 justify-center mt-4">
					<button
						className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
						onClick={handlePrevPage}
						disabled={currentPage === 1}
					>
						Prev
					</button>
					<div className="flex gap-2">
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								className={`mx-1 px-3 py-1 rounded-md ${
									currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
								}`}
								onClick={() => handlePageChange(index + 1)}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			</div>

			<ConfirmationModal
				visible={deleteModalVisible}
				onClose={() => setDeleteModalVisible(false)}
				onConfirm={handleDelete}
			/>

			<AddRecipeModal
				visible={showModalCreate}
				onClose={() => setShowModalCreate(false)}
				onRecipeCreated={getRecipesData}
			/>

			<EditRecipeModal
				visible={editModalVisible}
				onClose={() => setEditModalVisible(false)}
				recipe={recipeToEdit}
				onRecipeUpdated={getRecipesData}
			/>

			<DetailRecipeModal
				visible={detailModalVisible}
				onClose={() => setDetailModalVisible(false)}
				recipe={recipeToView}
			/>
		</>
	);
};

export default ManajemenRecipes;
