import React, { useRef } from "react";
import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from "@chakra-ui/react";

const AddItemDialog = ({ setNextStep, didSelectItems, willTriggerDialog }) => {
	const cancelRef = useRef();
	const onClose = () => willTriggerDialog(false);
	const navigateToVerifyItem = () => {
		setNextStep();
		onClose();
	};

	return (
		<AlertDialog
			isOpen={didSelectItems}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Confirmation
					</AlertDialogHeader>

					<AlertDialogBody>
						Is every item listed? You cannot return to this page to
						add more items for this round!
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme="green"
							onClick={navigateToVerifyItem}
							ml={3}
						>
							Confirm
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default AddItemDialog;
