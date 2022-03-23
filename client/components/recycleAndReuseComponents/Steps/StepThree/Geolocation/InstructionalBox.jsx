import { Box, Flex, Image } from "@chakra-ui/react";

export const InstructionalBox = () => (
	<div
		className="others-container"
		style={{
			position: "absolute",
			width: "80%",
			marginLeft: "10%",

			marginTop: "28%",
			height: "auto",
			zIndex: 998,
		}}
	>
		<Flex
			flexDirection="row"
			bg="white"
			height={{
				base: "150px", // 0-48em
				md: "180px", // 48em-80em,
				xl: "200px", // 80em+
			}}
			mt={[50, 20, 6, 8]}
		>
			<Box
				style={{
					paddingTop: "5%",
					paddingInline: "5%",
					width: "100%",
				}}
				fontSize={{
					base: "12px",
					md: "18px",
					lg: "20px",
				}}
				flexGrow={1}
			>
				Tell Uncle Semakau where you are now. Uncle Semakau will help
				you find where to take action!
			</Box>
			<Box flexGrow={1} h={"100%"} w={"100%"}>
				<Image
					src="/unclesemakau_singlet.png"
					alt="Uncle Semakau in a Singlet"
					ml={["0%", "10%  ", "20%", "30%", "35%"]}
					// w={["100%", "80%", "70%", "55%"]}
					height={"100%"}
				/>
			</Box>
		</Flex>
	</div>
);
