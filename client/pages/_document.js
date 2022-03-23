import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
				/>
				<link
					href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css"
					rel="stylesheet"
				/>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
