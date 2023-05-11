import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Link, useBreakpointValue } from "@chakra-ui/react";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { forwardRef } from "react";
import { COLORS } from "theme";
import { getNearbyFacilities } from "utils";
import { Tooltip } from "./Tooltip";
import { TItemSelection } from "app-context/SheetyContext/types";

type Props = {
	disabled: boolean;
};

export const StickyFooter = forwardRef<HTMLDivElement, Props>(({ disabled }, ref) => {
	const isMobile = useBreakpointValue({ base: true, md: false });

	const { items, address, setRecyclingLocationResults } = useUserInputs();
	const { facilities, getItemCategory } = useSheetyData();

	const handleWhereToRecyleClick = () => {
		setRecyclingLocationResults(
			getNearbyFacilities(items as TItemSelection[], address, facilities, getItemCategory),
		);
	};

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
						<Tooltip />
					</Flex>
					<Flex w="100%" align="center" justify="center">
						<Flex gap="1.5rem">
							<Button flex="1">How to recycle?</Button>
							<Button
								bg={COLORS.Button.primary}
								color={COLORS.white}
								flex="1"
								disabled={disabled}
								onClick={handleWhereToRecyleClick}
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
					>
						I prefer someone to collect from me
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
});

StickyFooter.displayName = "StickyFooter";
