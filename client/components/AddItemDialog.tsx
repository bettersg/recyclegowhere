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


interface AddItemDialogType{
	setNextStep: ()=> void;
	didSelectItems: boolean; 
	closeDialog:()=> void;
}
const AddItemDialog = (props: AddItemDialogType) => {
	const cancelRef = useRef(null);
	const navigateToVerifyItem = () => {
		props.setNextStep();
		props.closeDialog();
	};

	return (
		<AlertDialog
			isOpen={props.didSelectItems}
			leastDestructiveRef={cancelRef}
			onClose={props.closeDialog}
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
						<Button ref={cancelRef} onClick={closeDialog}>
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