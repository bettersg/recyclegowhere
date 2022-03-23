import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import React, { useEffect } from "react";
import TagManager from "react-gtm-module";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./Geolocation.css";

const tagManagerArgs = {
	gtmId: "GTM-TWC8D9H",
};

const theme = extendTheme({
	components: {
		Steps,
	},
});

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);

	return (
		<ChakraProvider theme={theme}>
			<Header />
			<Container
				maxW="container.xl"
				minH="80vh"
				paddingTop={10}
				paddingBottom={10}
			>
				<Component {...pageProps} />
			</Container>
			<Footer />
		</ChakraProvider>
	);
}

export default MyApp;
