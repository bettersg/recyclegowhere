import React from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import {
	useColorMode,
	Heading,
	Text,
	Flex,
	Stack,
	Avatar,
} from "@chakra-ui/react";

import Container from "../components/Container";

export default function BlogLayout({ children, frontMatter }) {
	const { colorMode } = useColorMode();
	const textColor = {
		light: "gray.700",
		dark: "gray.400",
	};

	return (
		<Container>
			<Head>
				<title>{frontMatter.title} – RGW Blog</title>
			</Head>
			<Stack
				as="article"
				spacing={8}
				justifyContent="center"
				alignItems="inherit"
				m="0 auto 4rem auto"
				maxWidth="700px"
				w="100%"
				px={2}
				textAlign="justify"
			>
				<Flex
					flexDirection="column"
					justifyContent="flex-start"
					alignItems="flex-start"
					maxWidth="700px"
					w="100%"
				>
					<Heading
						letterSpacing="tight"
						mb={2}
						as="h1"
						size="2xl"
						textAlign="left"
					>
						{frontMatter.title}
					</Heading>
					<Flex
						justify="space-between"
						align={["initial", "center"]}
						direction={["column", "row"]}
						mt={2}
						w="100%"
						mb={4}
					>
						<Flex align="center">
							<Avatar
								size="xs"
								name={frontMatter.author}
								src="../images/portrait.jpeg"
								mr={2}
							/>
							<Text fontSize="sm" color={textColor[colorMode]}>
								{frontMatter.author}
								{" on "}
								{format(
									parseISO(frontMatter.publishedAt),
									"MMMM dd, yyyy",
								)}
							</Text>
						</Flex>
						<Text
							fontSize="sm"
							color="gray.500"
							minWidth="100px"
							mt={[2, 0]}
							textAlign="right"
						>
							{frontMatter.readingTime.text}
						</Text>
					</Flex>
				</Flex>
				{children}
			</Stack>
		</Container>
	);
}
