import { StickyFooter } from "components/footer/StickyFooter";
import { NavHeader } from "components/nav/NavHeader";
import { ReactNode } from "react";
import { CustomHead } from "./components/CustomHead";

interface BasePageProps {
	title: string;
	description?: string;
	children: ReactNode;
}

export const BasePage = ({
	title,
	description = "",
	children,
}: BasePageProps) => {
	return (
		<>
			<CustomHead title={title} description={description} />
			<NavHeader />
			{children}
			<StickyFooter/>
		</>
	);
};
