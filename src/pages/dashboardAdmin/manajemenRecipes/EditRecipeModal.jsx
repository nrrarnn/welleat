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
import Swal from "sweetalert2";
import { editRecipe } from "../../../data/recipe";

const recipeSchema = z.object({
	recipeName: z.string().min(1, { message: "Name is required" }),
	ingredient: z.string().min(1, { message: "Bahan is required" }),
	step: z.string().min(1, { message: "Step is required" }),
	image: z.string().min(1, { message: "Image is required" }),
});

const EditRecipeModal = ({ visible, onClose, recipe, onRecipeUpdated }) => {
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			recipeName: "",
			ingredient: "",
			step: "",
			image: "",
		},
	});

	useEffect(() => {
		if (recipe) {
			reset({
				recipeName: recipe.recipeName,
				ingredient: recipe.ingredient.join("\n"),
				step: recipe.step.join("\n"),
				image: recipe.image,
			});
		}
	}, [recipe, reset]);

	const updateRecipe = async (data) => {
		try {
			const newRecipe = {
				recipeName: data.recipeName,
				ingredient: data.ingredient.split("\n").filter(Boolean),
				step: data.step.split("\n").filter(Boolean),
				image: data.image,
			};
			await editRecipe(newRecipe, recipe._id);
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
								name="recipeName"
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
								name="ingredient"
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
	recipe: PropTypes.object,
	onRecipeUpdated: PropTypes.func.isRequired,
};
