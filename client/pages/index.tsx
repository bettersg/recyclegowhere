import { Container, VStack } from "@chakra-ui/react";
import { StickyFooter } from "components/footer/StickyFooter";
import { Banner, UserInput } from "components/home";
import { NAVBAR_HEIGHT } from "components/nav/NavHeader";
import { useWindowDimensions } from "hooks/window/useWindowDimensions";
import { BasePage } from "layouts/BasePage";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import styles from "components/home/hideScrollbar.module.css";

const Home: NextPage = () => {
	const [stickyHeight, setStickyHeight] = useState<number>(0);
	const stickyRef = useRef<HTMLDivElement>(null);
	const { height } = useWindowDimensions();

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
				>
					<VStack align="initial" mx={25} spacing={30}>
						<Banner />
						<UserInput />
					</VStack>
				</Container>
				<StickyFooter ref={stickyRef} />
			</VStack>
		</BasePage>
	);
};

export default Home;
