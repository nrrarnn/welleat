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
import axios from "axios";
import Swal from "sweetalert2";

const recipeSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	bahan: z.string().min(1, { message: "Bahan is required" }),
	step: z.string().min(1, { message: "Step is required" }),
	image: z.string().min(1, { message: "Image is required" }),
});

const AddRecipeModal = ({ visible, onClose, onRecipeCreated }) => {
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			name: "",
			bahan: "",
			step: "",
			image: "",
		},
	});

	const createResep = async (data) => {
		try {
			const payload = {
				name: data.name,
				bahan: data.bahan,
				step: data.step,
				image: data.image,
			};
			await axios.post(
				"https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist",
				payload
			);
			Swal.fire({
				icon: "success",
				title: "Recipe added successfully!",
				text: "Your recipe has been saved.",
			});
			onRecipeCreated(); // Call the function to refresh the data
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
	onRecipeCreated: PropTypes.func.isRequired, // Define the prop type for onRecipeCreated
};
