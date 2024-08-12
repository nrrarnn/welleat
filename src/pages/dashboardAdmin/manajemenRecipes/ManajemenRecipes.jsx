import { IoMdAdd } from "react-icons/io";
import ListRecipes from "./ListRecipes";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AddRecipeModal from "./AddRecipeModal"; // Import the AddRecipeModal component
import ConfirmationModal from "../../../components/ConfirmationModal";

const ManajemenRecipes = () => {
	const [listRecipes, setListRecipes] = useState([]);
	const [recipeToDelete, setRecipeToDelete] = useState(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [showModalCreate, setShowModalCreate] = useState(false);

	const getRecipes = async () => {
		try {
			const response = await axios.get(
				"https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist"
			);
			setListRecipes(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(
				`https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist/${recipeToDelete}`
			);
			Swal.fire({
				title: "Berhasil",
				text: "Recipe deleted successfully",
				icon: "success",
			});
			setDeleteModalVisible(false);
			getRecipes();
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: error.response.data.message,
				icon: "error",
			});
		}
	};

	const handleDeleteClick = (id) => {
		setRecipeToDelete(id);
		setDeleteModalVisible(true);
	};

	useEffect(() => {
		getRecipes();
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
					key={recipe.id}
					name={recipe.name}
					img={recipe.image}
					bahan={recipe.bahan}
					onDelete={() => handleDeleteClick(recipe.id)}
				/>
			))}

			<ConfirmationModal
				visible={deleteModalVisible}
				onClose={() => setDeleteModalVisible(false)}
				onConfirm={handleDelete}
			/>

			{/* Add the AddRecipeModal component and control its visibility */}
			<AddRecipeModal
				visible={showModalCreate}
				onClose={() => setShowModalCreate(false)}
        onRecipeCreated={getRecipes}
			/>
		</>
	);
};

export default ManajemenRecipes;
