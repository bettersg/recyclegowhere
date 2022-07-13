import Head from "next/head";

interface CustomHeadProps {
	title: string;
	description: string;
}

export const CustomHead = ({ title, description }: CustomHeadProps) => (
	<Head>
		<title>{title} | RecycleGoWhere</title>
		<meta name="description" content={description} />
		<link rel="icon" href="/favicon.ico" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com"></link>
	</Head>
);
