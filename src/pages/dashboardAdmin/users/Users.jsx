import { useEffect, useState } from "react";
import { Avatar, Spinner } from "@nextui-org/react";
import { getUsers } from "../../../data/users";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredUser, setFilteredUser] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const userPerPage = 10;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUsers();
				setUsers(data.data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		const filtered = users.filter(
			(user) =>
				(user.username &&
					user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(user.email &&
					user.email.toLowerCase().includes(searchQuery.toLowerCase()))
		);
		setFilteredUser(filtered);
		setCurrentPage(1);
	}, [searchQuery, users]);

	if (loading)
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner label="Loading ..." size="lg" />
			</div>
		);
	if (error) return <p>Error: {error}</p>;

	// Pagination
	const indexOfLastUser = currentPage * userPerPage;
	const indexOfFirstUser = indexOfLastUser - userPerPage;
	const currentUser = filteredUser.slice(indexOfFirstUser, indexOfLastUser);
	const totalPages = Math.ceil(filteredUser.length / userPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	return (
		<>
			<section>
				<div className=" px-4 py-8 sm:px-6 sm:py-12 lg:px-8 w-full font-poppins">
					<div className="mx-auto ">
						<header className="text-center">
							<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
								Daftar Users
							</h1>
							<p>Lihat Informasi Mengenai Users</p>
						</header>

						<div className="mb-4 mt-4">
							<input
								type="text"
								placeholder="Search user..."
								className="p-2 border border-gray-300 rounded-lg w-full"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>

						<div className="mt-8">
							<ul className="space-y-4">
								{currentUser.map((user) => (
									<li
										key={user.id}
										className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg"
									>
										<Avatar
											showFallback
											src={
												user.avatarUrl || "https://images.unsplash.com/broken"
											}
										/>

										<div className="">
											<h3 className="text-sm text-gray-900">{user.username}</h3>

											<div className="mt-0.5 space-y-px text-[10px] text-gray-600">
												<div>
													<p className="inline">Email: </p>
													<p className="inline">{user.email}</p>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>

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
											currentPage === index + 1
												? "bg-blue-500 text-white"
												: "bg-gray-200"
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
				</div>
			</section>
		</>
	);
};

export default Users;
