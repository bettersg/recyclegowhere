import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Flex, Text, Tooltip as _Tooltip } from "@chakra-ui/react";
import { COLORS } from "theme";

export const Tooltip = () => (
	<Flex maxW="100%">
		<_Tooltip
			hasArrow
			height="18rem"
			width="12rem"
			blockSize="auto"
			label={
				<Text
					padding={2}
					noOfLines={8}
					fontSize="xs"
					color={COLORS.white}
					justifyContent="center"
					align="center"
				>
					<QuestionOutlineIcon w="2rem" h="2rem" />
					<br />
					Learn how to decontaminate and recycle properly. This will help reduce
					contamination in blue bins!
				</Text>
			}
			color={COLORS.black}
			placement="top"
		>
			<Text w="100%" fontSize="xs">
				Recommended!
			</Text>
		</_Tooltip>
	</Flex>
);
