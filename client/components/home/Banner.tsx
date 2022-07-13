import { Flex, Heading, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import styled from "styled-components";

export const Banner = () => (
	<Flex direction="column" align="center" my={23}>
		<Text mb={22}>Want to begin recycling?</Text>
		<Ellipse>
			<Image src="/unclesemakau.png" alt="Uncle Semakau" />
		</Ellipse>
		<Text mt={17}>
			Uncle sem will tell you!
			<br />
			what do u want to know?
		</Text>
	</Flex>
);

const Ellipse = styled.div`
	width: 115px;
	height: 115px;
	background-color: #c4c4c4;
	border-radius: 999px;
	position: relative;
	margin: -5px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface TextProps {
	mt?: number;
	mb?: number;
	children: ReactNode;
}
const Text = ({ mt, mb, children }: TextProps) => (
	<Heading size="md" textAlign="center" mb={mb} mt={mt}>
		{children}
	</Heading>
);
