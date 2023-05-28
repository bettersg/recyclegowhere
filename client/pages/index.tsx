import type { NextPage } from "next";
import { useState } from "react";
import { HomePage, HomePickupPage, InstructionsPage, MapPage } from "spa-pages";
import { Pages } from "spa-pages/pageEnums";

const Home: NextPage = () => {
	const [page, setPage] = useState<Pages>(Pages.HOME);

	let PageComponent: JSX.Element;
	switch (page) {
		case Pages.HOME:
			PageComponent = <HomePage setPage={setPage} />;
			break;
		case Pages.HOMEPICKUP:
			PageComponent = <HomePickupPage setPage={setPage} />;
			break;
		case Pages.INSTRUCTIONS:
			PageComponent = <InstructionsPage setPage={setPage} />;
			break;
		case Pages.MAP:
			PageComponent = <MapPage />;
			break;
	}
	return PageComponent;
};

export default Home;
