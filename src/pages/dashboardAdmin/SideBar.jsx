import { Divider } from "@nextui-org/react";
import PropTypes from "prop-types";

const SideBar = ({ setActivePage, isSidebarExpanded, activePage }) => {
	return (
		<>
			<div
				id="sidebar"
				className={`bg-white h-screen shadow-xl px-3 w-30 overflow-x-hidden transition-transform duration-300 ease-in-out ${
					isSidebarExpanded ? "w-60" : "w-16"
				}`}
			>
				<div className="space-y-6 md:space-y-10 mt-10 font-poppins">
					{isSidebarExpanded ? (
						<div className="flex justify-center items-center">
							<img src="./img/logo.png" alt="" className="w-[40px] " />
							<h1 className="font-bold text-sm md:text-xl text-center">
								Well<span className="text-sky-600">Eat.</span>
							</h1>
						</div>
					) : (
						<img src="./img/logo.png" alt="" className="w-[40px] " />
					)}

					<Divider />
					<div id="menu" className="flex flex-col space-y-2">
						{menuItems.map((item, index) => (
							<div
								key={index}
								onClick={() => setActivePage(item.title)}
								className={`text-sm font-medium py-2 px-2 rounded-md transition duration-150 ease-in-out
                ${
									activePage === item.title
										? "bg-blue-500 text-white"
										: "text-gray-700 hover:bg-sky-500 hover:text-white hover:text-base"
								}
              `}
							>
								<svg
									className="w-6 h-6 fill-current inline-block"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d={item.iconPath}></path>
								</svg>
								<span className={`ml-2 ${!isSidebarExpanded ? "hidden" : ""}`}>
									{item.title}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

const menuItems = [
	{
		title: "Dashboard",
		link: "#",
		iconPath:
			"M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
	},
	{
		title: "Manajemen Recipes",
		link: "#",
		iconPath:
			"M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z",
	},
	{
		title: "User",
		link: "#",
		iconPath:
			"M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
	},
];

export default SideBar;

SideBar.propTypes = {
	isSidebarExpanded: PropTypes.bool.isRequired,
	activePage: PropTypes.string.isRequired,
	setActivePage: PropTypes.func.isRequired,
};
