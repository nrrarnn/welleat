import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { BiDetail } from "react-icons/bi";

const ListRecipes = ({ id, name, img, onEdit, onDelete, onDetail }) => {
	return (
		<div
			key={id}
			className="mx-9 p-4 bg-sky-50 rounded-xl mt-4 font-poppins shadow-md hover:shadow-lg transition duration-150 ease-in-out"
		>
			<div className="flex flex-row justify-between items-center">
				<div className="flex items-center">
					<img
						src={`${img}`}
						alt={`${name}`}
						className="w-[100px] h-[100px] object-cover rounded-lg shadow-sm"
					/>
					<div className="px-4 text-start">
						<p className="text-sm font-semibold text-slate-800">{name}</p>
					</div>
				</div>
				<div className="flex gap-3">
					<Button color="success" variant="flat" onPress={onEdit}>
						<FaEdit className="text-lg" />
					</Button>
					<Button color="danger" variant="flat" onPress={onDelete}>
						<MdDelete className="text-lg" />
					</Button>
					{/* detail */}
					<Button color="primary" variant="flat" onPress={onDetail}>
						<BiDetail className="text-lg" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ListRecipes;

ListRecipes.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	bahan: PropTypes.arrayOf(PropTypes.string).isRequired,
	img: PropTypes.string.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onDetail: PropTypes.func.isRequired,
};
