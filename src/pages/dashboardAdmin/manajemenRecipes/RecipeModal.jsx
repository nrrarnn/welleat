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
import { useEffect } from "react";

const recipeSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	bahan: z.string().min(1, { message: "Bahan is required" }),
	step: z.string().min(1, { message: "Step is required" }),
	image: z.string().min(1, { message: "Image is required" }),
});

const RecipeModal = ({ visible, onClose, recipe, onSave }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			id: "",
			name: "",
			bahan: "",
			step: "",
			image: "",
		},
	});

	useEffect(() => {
		if (recipe) {
			reset(recipe);
		} else {
			reset({
				id: "",
				name: "",
				bahan: "",
				step: "",
				image: "",
			});
		}
	}, [recipe, reset]);

	const handleSave = (data) => {
		onSave(data);
		onClose();
		reset();
	};

	return (
		<Modal isOpen={visible} onOpenChange={onClose}>
			<ModalContent>
				<>
					<ModalHeader className="flex flex-col gap-1">
						{recipe ? "Edit Product" : "Add Product"}
					</ModalHeader>
					<form onSubmit={handleSubmit(handleSave)}>
						<ModalBody>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Nama Resep"
										fullWidth
										isInvalid={!!errors.name}
										errorMessage={errors.name?.message}
									/>
								)}
							/>
							<Controller
								name="bahan"
								control={control}
								render={({ field }) => (
									<Textarea
										{...field}
										label="Bahan"
										fullWidth
										isInvalid={!!errors.bahan}
										errorMessage={errors.bahan?.message}
									/>
								)}
							/>
							<Controller
								name="step"
								control={control}
								render={({ field }) => (
									<Textarea
										{...field}
										label="Step"
										fullWidth
										isInvalid={!!errors.step}
										errorMessage={errors.step?.message}
									/>
								)}
							/>
							<Controller
								name="image"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Link Gambar"
										fullWidth
										description="Please enter a valid image URL (e.g., https://example.com/image.jpg)."
										isInvalid={!!errors.image}
										errorMessage={errors.image?.message}
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
								{recipe ? "Update" : "Add"}
							</Button>
						</ModalFooter>
					</form>
				</>
			</ModalContent>
		</Modal>
	);
};

export default RecipeModal;

RecipeModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	recipe: PropTypes.object,
	onSave: PropTypes.func.isRequired,
};
