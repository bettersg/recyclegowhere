import {
	Box,
	Button,
	Container,
	Flex,
	Text,
	useBreakpointValue,
	Tooltip,
	Link,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import * as React from "react";

export const StickyFooter = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	return (
		<Box zIndex="999" as="section">
			<Box  zIndex="999" position="relative" >
				<Container
					boxShadow="0px 0 10px rgba(0, 0, 0, 0.8)"
					minW="100%"
					py={{ base: "4", md: "6" }}
					position="fixed"
					bottom="0"
                    zIndex="999"
				>
					<Flex
						direction={{ base: "column", sm: "row" }}
						gap={isMobile ? 0 : "3rem"}
						align="center"
						justify="center"
					>
						<Flex flexDir="column">
							<Flex
								w="100%"
								flex="1"
								align="center"
								mb="0.5rem"
								gap="0.3rem"
							>
								<Tooltip>
									<QuestionIcon w={3.5} />
								</Tooltip>
								<Text w="100%" fontSize="xs">
									Recommended!
								</Text>
							</Flex>
							<Flex w="100%" align="center" justify="center">
								<Flex gap="1.5rem">
									<Button flex="1">How to recycle?</Button>
									<Button bg="teal.500" color="#fff" flex="1">
										Where to recycle
									</Button>
								</Flex>
							</Flex>
						</Flex>

						<Flex justify="center" mt="1rem">
							<Link
								textDecor={isMobile ? "none" : "underline"}
								fontSize="sm"
								fontWeight="medium"
							>
								I prefer someone to collect from me
							</Link>
						</Flex>
					</Flex>
				</Container>
			</Box>
		</Box>
	);
};
