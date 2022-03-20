import { Flex, Image } from "@chakra-ui/react";

export const StepsLayout = ({ children }) => (
	<Flex
		flexDirection="column"
		justifyContent="center"
		alignItems="center"
		width="100%"
	>
		<Image src="/unclesemakau.png" alt="Uncle Semakau" />
		{children}
	</Flex>
);
