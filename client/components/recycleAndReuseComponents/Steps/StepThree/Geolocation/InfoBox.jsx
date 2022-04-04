import { Box, Button, Link } from "@chakra-ui/react";

export const InfoBox = ({ content, handleCloseInfoBox, homeMarker, displayDirection }) => (

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
				{displayDirection ?
					<Button
						mt={1}
						size="xs">
							<RedirectToGoogleMap origin={homeMarker} dest={content.props.marker.postal} />
					</Button>
					:
					""
				}
			</Box>
		</div>
	</Box>
);

const RedirectToGoogleMap = ({ origin, dest }) => (

	<Link href={
		`https://www.google.com/maps/dir/?api=1&origin=${origin.lat}%2C${origin.lng}&destination=${dest}`} target="_blank">
		Click for directions
	</Link>

);