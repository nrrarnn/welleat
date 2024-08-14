import { useEffect, useState } from "react";
import { getRecipes } from "../../../data/recipe";
import { getUsers } from "../../../data/users";
import PropTypes from "prop-types";

const DashboardHome = ({ setActivePage }) => {
	const [recipeCount, setRecipeCount] = useState(0);
	const [userCount, setUserCount] = useState(0);

	const fetchCounts = async () => {
		try {
			const recipeResponse = await getRecipes();
			const userResponse = await getUsers();
			setRecipeCount(recipeResponse.data.length);
			setUserCount(userResponse.data.length);
		} catch (error) {
			console.error("Error fetching counts:", error);
		}
	};

	useEffect(() => {
		fetchCounts();
	}, []);

	return (
		<div className="p-8 font-poppins">
			<h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard</h1>
			<div className="flex gap-8">
				{/* Kartu untuk Total Recipes */}
				<div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg overflow-hidden shadow-lg h-52 w-full flex items-end p-4">
					<img
						src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Recipes Background"
						className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
					<div className="relative z-10 w-full flex justify-between items-center">
						<div>
							<p className="text-xl font-semibold">Total Recipes</p>
							<p className="text-3xl font-bold">{recipeCount}</p>
						</div>
						<button
							onClick={() => setActivePage("Manajemen Recipes")}
							className="bg-white/20 text-white text-sm py-2 px-6 rounded-lg hover:bg-white/30 transition"
						>
							View
						</button>
					</div>
				</div>

				{/* Kartu untuk Total Users */}
				<div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg overflow-hidden shadow-lg h-52 w-full flex items-end p-4">
					<img
						src="https://plus.unsplash.com/premium_photo-1684225765349-072e1a35afc6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Users Background"
						className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
					<div className="relative z-10 w-full flex justify-between items-center">
						<div>
							<p className="text-xl font-semibold">Total Users</p>
							<p className="text-3xl font-bold">{userCount}</p>
						</div>
						<button
							onClick={() => setActivePage("User")}
							className="bg-white/20 text-white text-sm py-2 px-6 rounded-lg hover:bg-white/30 transition"
						>
							View
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;

DashboardHome.propTypes = {
	setActivePage: PropTypes.func.isRequired,
};