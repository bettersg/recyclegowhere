import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Icon,
	Link as ChakraLink,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
	return (
		<Box overflow="hidden" w="100vw" h="100%" p={2}>
			<Divider marginBottom={5} />
			<Flex
				flexDir={{ base: "column", lg: "row", md: "row", sm: "column" }}
				justifyContent={{ md: "space-around", sm: "center" }}
				alignItems={{ base: "center" }}
				marginBottom={10}
			>
				<Flex
					flexDir="column"
					alignItems={{ base: "center", md: "start" }}
				>
					<Heading as="h3" paddingBottom={1} fontSize="2xl">
						RecycleGoWhere
					</Heading>
					<Link href="/" passHref>
						<Button
							as="a"
							leftIcon={<ArrowForwardIcon />}
							colorScheme="teal"
							variant="link"
							m={1}
						>
							Home
						</Button>
					</Link>
					<Link href="/recycle-and-reuse" passHref>
						<Button
							as="a"
							leftIcon={<ArrowForwardIcon />}
							colorScheme="teal"
							variant="link"
							m={1}
						>
							Reuse/Recycle Items
						</Button>
					</Link>
				</Flex>
				<Flex
					flexDir="column"
					alignItems={{ base: "center", md: "start" }}
				>
					<Heading as="h3" paddingBottom={1} fontSize="2xl">
						Contact Us
					</Heading>
					<ChakraLink
						href="https://www.instagram.com/unclesemakau/"
						isExternal
					>
						<Button
							leftIcon={<Icon as={FaInstagram} />}
							colorScheme="teal"
							variant="link"
							m={1}
						>
							@unclesemakau
						</Button>
					</ChakraLink>
					<ChakraLink
						href="mailto:RecycleGoWhere@better.sg"
						isExternal
					>
						<Button
							leftIcon={<EmailIcon />}
							colorScheme="teal"
							variant="link"
							m={1}
						>
							RecycleGoWhere@better.sg
						</Button>
					</ChakraLink>
				</Flex>
			</Flex>
			<Flex
				flexDirection="column"
				justifyContent="space-between"
				alignItems="center"
				paddingTop={1}
			>
				<Text textAlign="center">
					A non-profit volunteer-run project by better.sg.{" "}
				</Text>
				<Text textAlign="center">Terms | Privacy</Text>
			</Flex>
		</Box>
	);
};

export default Footer;
