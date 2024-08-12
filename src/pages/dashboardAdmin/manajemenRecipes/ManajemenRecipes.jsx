import { IoMdAdd } from "react-icons/io";
import ListRecipes from "./ListRecipes";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeModal from "./RecipeModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Swal from "sweetalert2";

const ManajemenRecipes = () => {
	const [listRecipes, setListRecipes] = useState([]);
	const [recipe, setRecipe] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [recipeToDelete, setRecipeToDelete] = useState(null);

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

	const getRecipe = async (recipeId) => {
		try {
			const response = await axios.get(
				`https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist/${recipeId}`
			);
			setRecipe(response.data);
      console.log(response.data);
			setModalVisible(true);
		} catch (error) {
			console.log(error);
		}
	};
  

	const handleSave = async (recipe) => {
		console.log("Recipe to be saved:", recipe); 
		try {
			if (recipe.id) {
				await axios.put(
					`https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist/${recipe.id}`,
					recipe
				);
				Swal.fire({
					title: "Berhasil",
					text: "Recipe updated successfully",
					icon: "success",
				});
			} else {
				await axios.post(
					"https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist",
					recipe
				);
				Swal.fire({
					title: "Berhasil",
					text: "Recipe added successfully",
					icon: "success",
				});
			}
			getRecipes();
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: error.response?.data?.message || "Something went wrong!",
				icon: "error",
			});
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

	const handleAddClick = () => {
		setRecipe(null);
		setModalVisible(true);
	};

	const handleEditClick = (id) => {
		getRecipe(id);
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
						onClick={handleAddClick}
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
					onEdit={() => handleEditClick(recipe.id)}
					onDelete={() => handleDeleteClick(recipe.id)}
				/>
			))}

			<RecipeModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				recipe={recipe}
				onSave={handleSave}
			/>

			<ConfirmationModal
				visible={deleteModalVisible}
				onClose={() => setDeleteModalVisible(false)}
				onConfirm={handleDelete}
			/>
		</>
	);
};

export default ManajemenRecipes;
