import { useEffect, useState } from "react";
import { Avatar, Spinner } from "@nextui-org/react";
import { getUsers } from "../../../data/users";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	if (loading)
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner label="Loading ..." size="lg" />
			</div>
		);
	if (error) return <p>Error: {error}</p>;

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

						<div className="mt-8">
							<ul className="space-y-4">
								{users.map((user) => (
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
					</div>
				</div>
			</section>
		</>
	);
};

export default Users;
