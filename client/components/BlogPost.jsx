import { Box, Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import React from "react";

const BlogPost = ({ title, publishedAt, summary, slug }) => {
	const { colorMode } = useColorMode();
	const secondaryTextColor = {
		light: "gray.700",
		dark: "gray.400",
	};

	return (
		<NextLink href={`blog/${slug}`} passHref>
			<Link w="100%" _hover={{ textDecoration: "none" }}>
				<Box mb={10} display="block" width="100%">
					<Flex
						width="100%"
						align="flex-start"
						justifyContent="space-between"
						flexDirection={["column", "row"]}
					>
						<Flex
							flexDirection="column"
							align="flex-start"
							justifyContent="start"
							width="100%"
						>
							<Heading
								size="md"
								as="h3"
								mb={1}
								fontWeight="medium"
							>
								{title}
							</Heading>
						</Flex>

						<Text
							color="gray.500"
							minWidth="140px"
							textAlign={["left", "right"]}
							mb={[4, 0]}
						>
							{format(parseISO(publishedAt), "MMMM dd, yyyy")}
						</Text>
					</Flex>
					<Text color={secondaryTextColor[colorMode]}>{summary}</Text>
				</Box>
			</Link>
		</NextLink>
	);
};

export default BlogPost;
