import { VStack, Container } from "@chakra-ui/react";
import { Banner, UserInput } from "components/home";
import { BasePage } from "layouts/BasePage";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<BasePage title="Home" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
				padding={0}
			>
				<VStack align="initial" mx={25} spacing={30}>
					<Banner />
					<UserInput />
				</VStack>
			</Container>
		</BasePage>
	);
};

export default Home;
