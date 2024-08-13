import { IoMdAdd } from "react-icons/io";
import ListRecipes from "./ListRecipes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddRecipeModal from "./AddRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { deleteRecipe, getRecipes } from "../../../data/recipe";
import DetailRecipeModal from "./DetailRecipeModal";

const ManajemenRecipes = () => {
	const [listRecipes, setListRecipes] = useState([]);
	const [recipeToDelete, setRecipeToDelete] = useState(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [showModalCreate, setShowModalCreate] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [recipeToEdit, setRecipeToEdit] = useState(null);
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [recipeToView, setRecipeToView] = useState(null);

	const getRecipesData = async () => {
		try {
			const response = await getRecipes();
			setListRecipes(response.data);
		} catch (error) {
			console.log(error);
		}
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

	useEffect(() => {
		getRecipesData();
	}, []);

	return (
		<>
			<div className="p-8 font-poppins">
				<div className="flex items-center justify-between">
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
			</div>
			{listRecipes.map((recipe) => (
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
			))}

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
