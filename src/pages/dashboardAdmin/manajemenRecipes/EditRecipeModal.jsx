import PropTypes from "prop-types";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";

const recipeSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	bahan: z.string().min(1, { message: "Bahan is required" }),
	step: z.string().min(1, { message: "Step is required" }),
	image: z.string().min(1, { message: "Image is required" }),
});

const EditRecipeModal = ({ visible, onClose, recipe, onRecipeUpdated }) => {
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			name: "",
			bahan: "",
			step: "",
			image: "",
		},
	});

	useEffect(() => {
		if (recipe) {
			reset({
				name: recipe.name,
				bahan: recipe.bahan,
				step: recipe.step,
				image: recipe.image,
			});
		}
	}, [recipe, reset]);

	const updateRecipe = async (data) => {
		try {
			const payload = {
				name: data.name,
				bahan: data.bahan,
				step: data.step,
				image: data.image,
			};
			await axios.put(
				`https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist/${recipe.id}`,
				payload
			);
			Swal.fire({
				icon: "success",
				title: "Recipe updated successfully!",
				text: "Your changes have been saved.",
			});
			onRecipeUpdated();
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong! Please try again.",
			});
		} finally {
			onClose();
			reset();
		}
	};

	return (
		<Modal isOpen={visible} onOpenChange={onClose}>
			<ModalContent>
				<>
					<ModalHeader className="flex flex-col gap-1">Edit Recipe</ModalHeader>
					<form onSubmit={handleSubmit(updateRecipe)}>
						<ModalBody>
							<Controller
								name="name"
								control={control}
								render={({ field, fieldState }) => (
									<Input
										{...field}
										label="Recipe Name"
										fullWidth
										isInvalid={!!fieldState.error}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
							<Controller
								name="bahan"
								control={control}
								render={({ field, fieldState }) => (
									<Textarea
										{...field}
										label="Ingredients"
										fullWidth
										isInvalid={!!fieldState.error}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
							<Controller
								name="step"
								control={control}
								render={({ field, fieldState }) => (
									<Textarea
										{...field}
										label="Steps"
										fullWidth
										isInvalid={!!fieldState.error}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
							<Controller
								name="image"
								control={control}
								render={({ field, fieldState }) => (
									<Input
										{...field}
										label="Image Link"
										fullWidth
										description="Please enter a valid image URL (e.g., https://example.com/image.jpg)."
										isInvalid={!!fieldState.error}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={() => {
									onClose();
									reset();
								}}
							>
								Close
							</Button>
							<Button color="primary" type="submit">
								Save Changes
							</Button>
						</ModalFooter>
					</form>
				</>
			</ModalContent>
		</Modal>
	);
};

export default EditRecipeModal;

EditRecipeModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	recipe: PropTypes.object.isRequired,
	onRecipeUpdated: PropTypes.func.isRequired,
};
