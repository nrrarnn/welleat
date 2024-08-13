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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { createRecipe } from "../../../data/recipe";

const recipeSchema = z.object({
	recipeName: z.string().min(1, { message: "Name is required" }),
	ingredient: z.string().min(1, { message: "Ingredients are required" }),
	step: z.string().min(1, { message: "Step is required" }),
	image: z
		.string()
		.url({ message: "Image must be a valid URL" })
		.min(1, { message: "Image is required" }),
});

const AddRecipeModal = ({ visible, onClose, onRecipeCreated }) => {
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			recipeName: "",
			ingredient: "",
			step: "",
			image: "",
		},
	});

	const createResep = async (data) => {
		try {
			const newRecipe = {
				recipeName: data.recipeName,
				ingredient: data.ingredient.split("\n"),
				step: data.step.split("\n"),
				image: data.image,
			};
			await createRecipe(newRecipe);
			Swal.fire({
				icon: "success",
				title: "Recipe added successfully!",
				text: "Your recipe has been saved.",
			});
			onRecipeCreated();
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
					<ModalHeader className="flex flex-col gap-1">Add Recipe</ModalHeader>
					<form onSubmit={handleSubmit(createResep)}>
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
								Add
							</Button>
						</ModalFooter>
					</form>
				</>
			</ModalContent>
		</Modal>
	);
};

export default AddRecipeModal;

AddRecipeModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onRecipeCreated: PropTypes.func.isRequired,
};
