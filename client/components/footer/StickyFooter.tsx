import { CalendarIcon, InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { forwardRef } from "react";
import { Pages } from "spa-pages/pageEnums";
import { COLORS } from "theme";
import { getNearbyFacilities } from "utils";
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

	const handleNextPage = (pageNumber: number) => {
		setRecyclingLocationResults(
			getNearbyFacilities(
				items as TItemSelection[],
				address,
				facilities,
				getItemCategory,
				MAX_DISTANCE_KM,
			),
		);

		setPage(pageNumber);
	};

	return (
		<Box
			ref={ref}
			boxShadow="0px 0 10px rgba(0, 0, 0, 0.8)"
			minH={{ base: "20%", md: "10%" }}
			minW="100%"
			py={{ base: "4", md: "6" }}
		>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap={isMobile ? "1rem" : "3rem"}
				justify="center"
				px="6"
			>
				<Button
					isDisabled={disabled}
					bg={COLORS.Button.primary}
					color="white"
					justifyContent="flex-start"
					leftIcon={<SearchIcon />}
					onClick={() => handleNextPage(Pages.MAP)}
				>
					Find nearest recycling points
				</Button>
				<Button
					isDisabled={disabled}
					bg={COLORS.Button.primary}
					color="white"
					justifyContent="flex-start"
					leftIcon={<CalendarIcon />}
					onClick={() => handleNextPage(Pages.PICKUP)}
				>
					Arrange pickups
				</Button>
				<Button
					isDisabled={disabled}
					color="black"
					justifyContent="space-between"
					onClick={() => setPage(Pages.INSTRUCTIONS)}
					rightIcon={<InfoOutlineIcon />}
				>
					How to recycle them properly?
				</Button>
			</Flex>
		</Box>
	);
});

StickyFooter.displayName = "StickyFooter";
