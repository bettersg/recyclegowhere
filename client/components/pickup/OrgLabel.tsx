import { Text, HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { COLORS } from "theme";

type Props = {
	icon: IconType;
	title: string;
	text: string;
};

const OrgLabel = (props: Props) => {
	return (
		<HStack flexShrink={0} w="100%">
			<Icon as={props.icon} boxSize={4} />
			<Text as="b" fontSize="sm" color={COLORS.teal} fontWeight={500}>
				{props.title}
			</Text>
			<Text fontSize="sm" fontWeight={500}>
				{props.text}
			</Text>
		</HStack>
	);
};

export default OrgLabel;
