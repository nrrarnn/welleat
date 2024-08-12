import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Button } from "@nextui-org/react";

const ListRecipes = ({ id, name, bahan, img, onEdit, onDelete }) => {
	return (
		<>
			<div key={id} className="mx-9 p-2 bg-sky-50 rounded-xl mt-4">
				<div className="flex flex-row justify-between">
					<img src={`${img}`} alt={`${name}`} className="w-[100px]" />
					<div className="px-4">
						<p className="text-[1rem]">{name}</p>
						<p>{bahan}</p>
					</div>
					<div className="flex gap-2">
						<Button color="success" variant="flat" onPress={onEdit}>
							<FaEdit />
						</Button>
						<Button color="danger" variant="flat" onPress={onDelete}>
							<MdDelete />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListRecipes;

ListRecipes.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bahan: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};