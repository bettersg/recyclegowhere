import { Container, VStack } from "@chakra-ui/react";
import { StickyFooter } from "components/footer/StickyFooter";
import { Banner, UserInput } from "components/home";
import styles from "components/home/hideScrollbar.module.css";
import { NAVBAR_HEIGHT } from "components/nav/NavHeader";
import { useSheetyData } from "hooks/useRecyclableItemList";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { BasePage } from "layouts/BasePage";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { InstructionsPage } from "./InstructionsPage";
import { MapPage } from "./MapPage";
import { HomePickupPage } from "./HomePickupPage";

const Home: NextPage = () => {
	const [stickyHeight, setStickyHeight] = useState<number>(0);
	const [readyToSubmit, setReadyToSubmit] = useState(false);
	const [page, setPage] = useState<number>(0);
	const { height } = useWindowDimensions();
	const { isLoaded } = useSheetyData();

	const stickyRef = useRef<HTMLDivElement>(null);
	const scrollableContainerRef = useRef<HTMLObjectElement>(null);

	useEffect(() => {
		setStickyHeight(stickyRef.current?.clientHeight || 0);
	}, [stickyRef.current?.clientHeight, height]);

	return (
		<BasePage title="Home" description="Singapore's first recycling planner">
			<VStack p={0} m={0} height={`${height - NAVBAR_HEIGHT}px`}>
				<Container
					className={styles.hideScrollbar}
					maxW={{
						base: "full",
						sm: "container.md",
					}}
					p={0}
					pb={5}
					overflow="auto"
					height={height - stickyHeight - NAVBAR_HEIGHT}
					ref={scrollableContainerRef}
				>
					{page === 0 && (
						<VStack align="initial" mx={25} spacing={30}>
							<Banner />
							{isLoaded && (
								<UserInput
									scrollableContainerRef={scrollableContainerRef}
									setReadyToSubmit={setReadyToSubmit}
								/>
							)}
						</VStack>
					)}
					{page === 1 && (
						<VStack align="initial" mx={25} spacing={30}>
							<InstructionsPage />
						</VStack>
					)}
					{page === 2 && (
						<VStack align="initial" mx={25} spacing={30}>
							<MapPage />
						</VStack>
					)}
					{page === 3 && (
						<VStack align="initial" mx={25} spacing={30}>
							<HomePickupPage />
						</VStack>
					)}
				</Container>
				{page === 0 && (
					<StickyFooter ref={stickyRef} disabled={!readyToSubmit} setPage={setPage} />
				)}
			</VStack>
		</BasePage>
	);
};

export default Home;
