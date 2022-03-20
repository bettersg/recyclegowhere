import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Heading,
	IconButton,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

const Header = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const colorChange = useColorModeValue("black", "gray.50");
	// const bgColorChange = useColorModeValue("gray.50", "gray.900");

	return (
		<>
			<Head>
				{/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#ffc40d" />
                <meta name="theme-color" content="#ffffff" /> */}
			</Head>
			<Flex
				overflow="hidden"
				as="nav"
				align="center"
				justify="space-between"
				wrap="wrap"
				padding={5}
				bg="teal.700"
				// color={colorChange}
				{...props}
			>
				<Flex align="center" mr={5}>
					<Link href="/">
						<a>
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
						</a>
					</Link>
				</Flex>
				<IconButton
					variant="solid"
					color="white"
					background="	rgb(0,0,0, 0.3)"
					aria-label="Navigate website"
					icon={<HamburgerIcon />}
					onClick={onOpen}
				/>
				<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth="1px">
							Menu
						</DrawerHeader>
						<DrawerBody>
							<Link href="/">
								<a>
									<Text fontWeight="bold">Home</Text>
								</a>
							</Link>
							<Link href="/recycle-and-reuse">
								<a>
									<Text fontWeight="bold">
										Reuse / Recycle Items
									</Text>
								</a>
							</Link>
							<Link href="/blog">
								<a>
									<Text fontWeight="bold">
										Blog &amp; Stories
									</Text>
								</a>
							</Link>
						</DrawerBody>
						<DarkModeSwitch />
					</DrawerContent>
				</Drawer>
			</Flex>
		</>
	);
};

export default Header;
