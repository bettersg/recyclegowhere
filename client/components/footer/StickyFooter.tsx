import { QuestionIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Link, Text, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { forwardRef } from "react";
import { Pages } from "spa-pages/pageEnums";
import { COLORS } from "theme";

type Props = {
	disabled: boolean;
	setPage: (pageNumber: number) => void;
};

export const StickyFooter = forwardRef<HTMLDivElement, Props>(({ disabled, setPage }, ref) => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	return (
		<Container
			ref={ref}
			boxShadow="0px 0 10px rgba(0, 0, 0, 0.8)"
			minW="100%"
			py={{ base: "4", md: "6" }}
		>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap={isMobile ? 0 : "3rem"}
				align="center"
				justify="center"
			>
				<Flex flexDir="column">
					<Flex w="100%" flex="1" align="center" mb="0.5rem" gap="0.3rem">
						<QuestionIcon w={3.5} />
						<Flex maxW="100%">
							<Tooltip
								hasArrow
								height={"18rem"}
								width={"12rem"}
								blockSize={"auto"}
								label={
									<Text
										padding={2}
										noOfLines={8}
										fontSize="xs"
										color={"white"}
										justifyContent={"center"}
										align="center"
									>
										<QuestionOutlineIcon w={"2rem"} h={"2rem"} />
										<br />
										Learn how to decontaminate and recycle properly. This will
										help reduce contamination in blue bins!
									</Text>
								}
								color="black"
								placement="top"
							>
								<Text w="100%" fontSize="xs">
									Recommended!
								</Text>
							</Tooltip>
						</Flex>
					</Flex>
					<Flex w="100%" align="center" justify="center">
						<Flex gap="1.5rem">
							<Button flex="1" onClick={() => setPage(Pages.INSTRUCTIONS)}>
								How to recycle?
							</Button>
							<Button
								bg={COLORS.Button.primary}
								color={COLORS.white}
								flex="1"
								disabled={disabled}
								onClick={() => setPage(Pages.MAP)}
							>
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
						onClick={() => setPage(Pages.HOMEPICKUP)}
					>
						I prefer someone to collect from me
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
});

StickyFooter.displayName = "StickyFooter";
