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
import { useState } from "react";

const recipeSchema = z.object({
	recipeName: z.string().min(1, { message: "Name is required" }),
	ingredient: z.string().min(1, { message: "Ingredients are required" }),
	step: z.string().min(1, { message: "Step is required" }),
});

const AddRecipeModal = ({ visible, onClose, onRecipeCreated }) => {
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

	const createResep = async (data) => {
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

			if (imageFile && imageFile[0]) {
				formData.append("image", imageFile[0]);
			} else {
				throw new Error("No image file selected");
			}

			await createRecipe(formData);
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
							<div className="mt-4">
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
							<Button color="primary" type="submit" disabled={isLoading}>
								{isLoading ? "Adding..." : "Add"}
							</Button>
						</ModalFooter>
					</form>
				</>
			</ModalContent>
		</Modal>
	);
};

AddRecipeModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onRecipeCreated: PropTypes.func.isRequired,
};

export default AddRecipeModal;
