import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Link, useBreakpointValue } from "@chakra-ui/react";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { forwardRef } from "react";
import { Pages } from "spa-pages/pageEnums";
import { COLORS } from "theme";
import { getNearbyFacilities } from "utils";
import { Tooltip } from "./Tooltip";
import { TItemSelection } from "app-context/SheetyContext/types";
import { MAX_DISTANCE_KM } from "utils";

type Props = {
	disabled: boolean;
	setPage: (pageNumber: number) => void;
};

export const StickyFooter = forwardRef<HTMLDivElement, Props>(({ disabled, setPage }, ref) => {
	const isMobile = useBreakpointValue({ base: true, md: false });

	const { items, address, setRecyclingLocationResults } = useUserInputs();
	const { facilities, getItemCategory } = useSheetyData();

	const handleWhereToRecyleClick = () => {
		setRecyclingLocationResults(
			getNearbyFacilities(
				items as TItemSelection[],
				address,
				facilities,
				getItemCategory,
				MAX_DISTANCE_KM,
			),
		);

		setPage(Pages.MAP);
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
							<Button
								disabled={disabled}
								flex="1"
								onClick={() => setPage(Pages.INSTRUCTIONS)}
							>
								How to recycle?
							</Button>
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
						onClick={!disabled ? () => setPage(Pages.HOMEPICKUP) : undefined}
						sx={{
							opacity: disabled ? 0.5 : 1,
							cursor: disabled ? "not-allowed" : "pointer",
							textDecoration: disabled ? "none" : "underline",
						}}
					>
						I prefer someone to collect from me
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
});

StickyFooter.displayName = "StickyFooter";
