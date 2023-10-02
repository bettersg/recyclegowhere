import { CloseIcon, InfoIcon } from "@chakra-ui/icons";
import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, TagLabel, TagLeftIcon, Text, useDisclosure } from "@chakra-ui/react";
import { Categories } from "api/sheety/enums";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
	items: (TItemSelection | TEmptyItem)[];
	getItemCategory: (itemName: string) => Categories;
};

const NonRecyclableModal = ({ setPage, items, getItemCategory }: Props) => {
	const nonRecyclableItems = items.filter((item) => getItemCategory(item.name) === Categories.GENERAL_WASTE);

	const { isOpen, onClose } = useDisclosure({ defaultIsOpen: nonRecyclableItems.length > 0 });

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={["xs", "sm", "md"]}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader px={4} fontSize="medium" fontWeight="bold">Some of your things cannot recycle!</ModalHeader>
				<ModalBody px={4} py={0}>
					<Text fontSize="sm" fontWeight="semibold" mb={2}>These things will be removed from your list:</Text>
					<Flex gap={2} wrap="wrap">
						{nonRecyclableItems.map((item, index) =>
							<Tag key={index} borderRadius="full" variant="outline" colorScheme="red" color="black" bg="red.100">
								<TagLeftIcon boxSize={2} as={CloseIcon} color="red" mr={1} />
								<TagLabel fontWeight={300} fontSize="xs" pt={1}>{item.name}</TagLabel>
							</Tag>
						)}
					</Flex>
				</ModalBody>
				<ModalFooter px={4} justifyContent="space-between">
					<Button
						variant="outline"
						color="black"
						onClick={() => setPage(Pages.INSTRUCTIONS)}
						rightIcon={<InfoIcon color="teal" />}
						size="sm"
					>
						Why cannot recycle?</Button>
					<Button
						colorScheme="teal"
						onClick={onClose}
						size="sm"
					>
						Continue
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NonRecyclableModal;