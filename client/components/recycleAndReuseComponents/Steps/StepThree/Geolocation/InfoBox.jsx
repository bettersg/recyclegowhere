import { Box, Button } from "@chakra-ui/react";

export const InfoBox = ({ content, handleCloseInfoBox }) => (
	<Box
		className="others-container"
		position="absolute"
		width="130%"
		marginLeft="-15%"
		height="auto"
		zIndex="9999"
		mt={[600, 600, 600, 550]}
		fontSize={["xs", "sm", "sm", "sm"]}
		borderWidth="1px"
		borderRadius="xl"
		bg="#E6FFFA
"
	>
		<div mt={[1, 4, 6, 8]}>
			<Box flex={1} p={4}>
				<span>{content}</span>
				<br />
				<Button
					onClick={handleCloseInfoBox}
					colorScheme="teal"
					size="xs"
					mt={1}
				>
					X
				</Button>
			</Box>
		</div>
	</Box>
);
