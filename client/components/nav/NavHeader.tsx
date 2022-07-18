import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	IconButton,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { COLORS } from "theme";

export const NavHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			overflow="hidden"
			as="nav"
			align="center"
			justify="flex-end"
			wrap="wrap"
			padding={5}
			bg={COLORS.teal}
		>
			{/* <Flex align="center" mr={5}>
				<Link href="/">
					<Heading
						as="h1"
						size="lg"
						letterSpacing={"tighter"}
						color="white"
					>
						<Heading as="span" size="lg" fontWeight="300">
							RecycleGo
						</Heading>
						Where
						<Heading as="sup" size="sm">
							beta
						</Heading>
					</Heading>
				</Link>
			</Flex> */}
			<IconButton
				variant="solid"
				color={COLORS.black}
				background={COLORS.white}
				aria-label="Navigate website"
				icon={<HamburgerIcon />}
				onClick={onOpen}
			/>
			<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
					<DrawerBody>
						<Link href="/">
							<a>
								<Text fontWeight="bold">Home</Text>
							</a>
						</Link>
					</DrawerBody>
					{/* <DarkModeSwitch /> */}
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};
