import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppContextProvider } from "app-context";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import TagManager from "react-gtm-module";
import "leaflet/dist/leaflet.css";
import "public/Marker.css";
const theme = extendTheme({
	colors: {
		select: {
			placeholder: "rgba(45, 55, 72, 0.36)",
		},
	},
});

const tagManagerArgs = {
	gtmId: "GTM-TWC8D9H",
};

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);
	return (
		<ChakraProvider theme={theme}>
			<AppContextProvider>
				<Component {...pageProps} />
			</AppContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
