import PropTypes from "prop-types";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

const DetailRecipeModal = ({ visible, onClose, recipe }) => {
	if (!recipe) return null;

	return (
		<Modal
			isOpen={visible}
			onOpenChange={onClose}
			size="4xl"
			scrollBehavior="inside"
			className="font-poppins"
		>
			<ModalContent>
				<>
					<ModalHeader>
						<h3 className="text-2xl font-bold">{recipe.recipeName}</h3>
					</ModalHeader>
					<ModalBody className="overflow-y-auto max-h-[70vh]">
						<img
							src={recipe.image}
							alt={recipe.recipeName}
							className="w-full h-auto rounded-md"
						/>
						<div className="text-start">
							<h2 className="text-lg lg:text-xl font-semibold mb-2">Bahan</h2>
							<ol>
								{recipe.ingredient.map((item, index) => (
									<li key={index} className="list-decimal list-inside">
										{item}
									</li>
								))}
							</ol>
							<h2 className="text-lg lg:text-xl font-semibold mt-6 mb-2">
								Langkah - langkah
							</h2>
							<ol>
								{recipe.step.map((item, index) => (
									<li key={index} className="list-decimal list-inside">
										{item}
									</li>
								))}
							</ol>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button auto flat color="error" onPress={onClose}>
							Close
						</Button>
					</ModalFooter>
				</>
			</ModalContent>
		</Modal>
	);
};

DetailRecipeModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	recipe: PropTypes.object.isRequired,
};

export default DetailRecipeModal;
