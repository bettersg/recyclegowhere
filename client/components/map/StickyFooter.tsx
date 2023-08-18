import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

const StickyFooter = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<>
			<Box
				as="footer"
				w="100%"
				bg="white"
				py={4}
				position="fixed"
				bottom={isExpanded ? "92vh" : 0}
				transition="bottom 0.3s"
				zIndex={9999}
			>
				<Box textAlign="center" position="relative" cursor="pointer" onClick={handleExpand}>
					<Box
						position="absolute"
						top="-10px"
						left="50%"
						transform="translateX(-50%)"
						w="30px"
						h="2px"
						bg="black"
					/>
					<Box>
						<p>Your Footer Text</p>
					</Box>
				</Box>
			</Box>
			{isExpanded && (
				<Box bg="gray.200" py={4} width={"100vw"} height={"90vh"}>
					hi
				</Box>
			)}
		</>
	);
};
