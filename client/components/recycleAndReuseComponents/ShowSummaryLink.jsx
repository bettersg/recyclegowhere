import { CopyIcon } from "@chakra-ui/icons";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import { useRef } from "react";

function ShowSummaryLink({ isOpen, onClose, linkId }) {
	const summaryLink = `https://recyclegowhere.sg/summary/${linkId}`;
	const linkRef = useRef(summaryLink);
	const toast = useToast();

	function copyToClipboard(e) {
		linkRef.current.select();
		// linkRef.current.setSelectionRange(0,9999)
		navigator.clipboard.writeText(summaryLink);

		toast({
			// title: "Copy Summary Link",
			description: "Link copied!",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

		e.target.focus();
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					{/* <ModalHeader>Summary Link</ModalHeader> */}

					<ModalCloseButton />

					<ModalBody>
						<br />
						Here&apos;s the unique link to your summary:
						<Input
							ref={linkRef}
							isReadOnly
							placeholder={summaryLink}
						/>
					</ModalBody>

					<ModalFooter>
						<Button
							variant="ghost"
							colorScheme="teal"
							mr={3}
							onClick={copyToClipboard}
						>
							Copy Link <CopyIcon />
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ShowSummaryLink;
