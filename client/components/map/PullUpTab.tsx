import { Box } from "@chakra-ui/react";

type TabProps = {
	isExpanded: boolean;
	isMobile?: boolean;
	handleStickyFooter: () => void;
	numberOfNearby: number;
};

const PullUpTab = ({ isExpanded, isMobile, handleStickyFooter, numberOfNearby }: TabProps) => {
	return (
		<Box
			as="footer"
			w="100%"
			bg="white"
			py={4}
			position="fixed"
			bottom={isExpanded ? (isMobile ? "93.5vh" : "91.5vh") : 0}
			transition="bottom 0.1s"
			zIndex={9999}
			onClick={handleStickyFooter}
			height="57px"
		>
			<Box textAlign="center" position="relative" cursor="pointer">
				<Box
					position="absolute"
					top="-10px"
					left="50%"
					transform="translateX(-50%)"
					w="30px"
					h="2px"
					bg="black"
					borderTopRadius="xl"
				/>
				<Box>
					<p>{numberOfNearby} facilities available within 1km.</p>
				</Box>
			</Box>
		</Box>
	);
};

export default PullUpTab;
