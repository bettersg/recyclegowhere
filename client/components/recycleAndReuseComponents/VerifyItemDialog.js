import React, { useRef } from "react";
import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Box,
	Button,
	HStack,
	Text,
} from "@chakra-ui/react";

const VerifyItemDialog = ({
	setNextStep,
	showDialog,
	setShowDialog,
	generalWasteItems,
	generalWasteItemDetails,
	selectedItems,
	setItems,
	dialogItemIndex,
	setDialogItemIndex,
}) => {
	const cancelRef = useRef();
	const closeDialog = () => setShowDialog(false);
	const navigateToGeolocation = () => {
		setItems(selectedItems);
		setNextStep();
		closeDialog();
	};

	const generalWasteItem = generalWasteItems[dialogItemIndex];
	const generalWasteItemDetail = generalWasteItemDetails.find(
		(item) => item.description === generalWasteItem.description,
	);

	const hasNextGeneralWasteItems =
		dialogItemIndex < generalWasteItems.length - 1;
	const hasPrevGeneralWasteItems = dialogItemIndex > 0;

	return (
		<AlertDialog
			isOpen={showDialog}
			leastDestructiveRef={cancelRef}
			onClose={closeDialog}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						The following items cannot be recycled.
					</AlertDialogHeader>

					<AlertDialogBody>
						<Box width="100%" key={generalWasteItemDetail.id}>
							<Text fontWeight="bold">
								{generalWasteItemDetail.description}
							</Text>
							<Text my={4}>
								Reason: {generalWasteItemDetail.reason}
							</Text>
							<Text>
								Suggestion: {generalWasteItemDetail.suggestion}
							</Text>
						</Box>
					</AlertDialogBody>

					<AlertDialogFooter>
						<HStack>
							{hasPrevGeneralWasteItems && (
								<Button
									colorScheme="green"
									variant="outline"
									onClick={() =>
										setDialogItemIndex(dialogItemIndex - 1)
									}
									ml={3}
								>
									Previous
								</Button>
							)}
							{hasNextGeneralWasteItems && (
								<Button
									colorScheme="green"
									onClick={() =>
										setDialogItemIndex(dialogItemIndex + 1)
									}
									ml={3}
								>
									Next
								</Button>
							)}
							{!hasNextGeneralWasteItems && (
								<Button
									colorScheme="green"
									onClick={navigateToGeolocation}
									ml={3}
								>
									Confirm
								</Button>
							)}
						</HStack>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default VerifyItemDialog;
