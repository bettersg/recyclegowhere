import { Button, Container, Flex, useBreakpointValue, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { Pages } from "spa-pages/pageEnums";
import { COLORS } from "theme";

type Props = {
	setPage: (pageNumber: number) => void;
};

export const StickyFooterInstructions = forwardRef<HTMLDivElement, Props>(({ setPage }, ref) => {
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
					<Flex w="100%" align="center" justify="center" direction="column" gap="2">
						<Text>I’ve read them all, and I’m ready! So...</Text>
						<Button
							bg={COLORS.Button.primary}
							color={COLORS.white}
							flex="1"
							onClick={() => setPage(Pages.MAP)}
							py="3"
						>
							Show me the map
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Container>
	);
});

StickyFooterInstructions.displayName = "StickyFooterInstructions";
