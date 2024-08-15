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
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { editRecipe } from "../../../data/recipe";

const recipeSchema = z.object({
	recipeName: z.string().min(1, { message: "Name is required" }),
	ingredient: z.string().min(1, { message: "Ingredients are required" }),
	step: z.string().min(1, { message: "Steps are required" }),
});

const EditRecipeModal = ({ visible, onClose, recipe, onRecipeUpdated }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { control, handleSubmit, reset, setValue, watch } = useForm({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			recipeName: "",
			ingredient: "",
			step: "",
			image: null,
		},
	});

	const imageFile = watch("image");

	useEffect(() => {
		if (recipe) {
			reset({
				recipeName: recipe.recipeName,
				ingredient: recipe.ingredient.join("\n"),
				step: recipe.step.join("\n"),
				image: null,
			});
		}
	}, [recipe, reset]);

	const updateRecipe = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("recipeName", data.recipeName);
			data.ingredient
				.split("\n")
				.filter(Boolean)
				.forEach((item) => formData.append("ingredient[]", item));
			data.step
				.split("\n")
				.filter(Boolean)
				.forEach((item) => formData.append("step[]", item));

			// Periksa jika file gambar ada dan tambahkan ke FormData
			if (imageFile && imageFile[0]) {
				formData.append("image", imageFile[0]);
			}

			await editRecipe(recipe._id, formData);
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
				text: error.message || "Something went wrong! Please try again.",
			});
		} finally {
			setIsLoading(false);
			onClose();
			reset();
		}
	};

	return (
		<Modal isOpen={visible} onOpenChange={onClose} className="font-poppins">
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
							<div className="space-y-10">
								{recipe?.image && (
									<div className="mb-4">
										<p>Gambar saat ini</p>
										<img
											src={recipe.image}
											alt={recipe.recipeName}
											className="w-28 h-auto rounded-lg"
										/>
									</div>
								)}
								<Input
									label="Upload Image"
									type="file"
									id="image"
									accept="image/*"
									onChange={(e) => {
										setValue("image", e.target.files);
									}}
									className="mt-1 block w-full"
								/>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={() => {
									onClose();
									reset();
								}}
								disabled={isLoading}
							>
								Close
							</Button>
							<Button color="primary" type="submit">
								{isLoading ? "Saving..." : "Save"}
							</Button>
						</ModalFooter>
					</form>
				</>
			</ModalContent>
		</Modal>
	);
};

EditRecipeModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	recipe: PropTypes.object.isRequired,
	onRecipeUpdated: PropTypes.func.isRequired,
};

export default EditRecipeModal;
