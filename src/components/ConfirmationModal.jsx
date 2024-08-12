import PropTypes from "prop-types";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

const ConfirmationModal = ({ visible, onClose, onConfirm }) => {
	return (
		<Modal isOpen={visible} onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					Confirm Deletion
				</ModalHeader>
				<ModalBody>
					<p>Are you sure you want to delete this product?</p>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="light" onPress={onClose}>
						Cancel
					</Button>
					<Button color="primary" onPress={onConfirm}>
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

ConfirmationModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
