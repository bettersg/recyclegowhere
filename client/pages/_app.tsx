import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppContextProvider } from "app-context";
import type { AppProps } from "next/app";
import "leaflet/dist/leaflet.css";
import "public/Marker.css";

if (typeof window !== "undefined") {
	if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
		require("mocks");
	}
}

const theme = extendTheme({
	colors: {
		select: {
			placeholder: "rgba(45, 55, 72, 0.36)",
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AppContextProvider>
				<Component {...pageProps} />
			</AppContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
