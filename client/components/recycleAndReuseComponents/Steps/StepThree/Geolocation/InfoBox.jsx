import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Alert, AlertIcon } from "@chakra-ui/react";

export const InfoBox = ({ content, handleCloseInfoBox }) => {
	let [warningStyles, setWarningStyles] = useState(false);

	useEffect(() => {
		if (Object.keys(content?.props).includes("warning")) {
			setWarningStyles(true);
		} else {
			setWarningStyles(false);
		}
	}, [content?.props]);

	return (
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
			bg={warningStyles ? "#FEECC8" : "#E6FFFA"}
		>
			<div mt={[1, 4, 6, 8]}>
				<Flex justifyContent="space-between" flex={1} p={4}>
					<Flex flexDir="column">
						<span>{content}</span>
						<br />
						<Button
							onClick={handleCloseInfoBox}
							colorScheme="teal"
							size="xs"
							mt={1}
							w="fit-content"
						>
							X
						</Button>
					</Flex>
					{warningStyles && (
						<Flex>
							<Alert status="warning">
								<AlertIcon boxSize="2.5rem" />
							</Alert>
						</Flex>
					)}
				</Flex>
			</div>
		</Box>
	);
};
