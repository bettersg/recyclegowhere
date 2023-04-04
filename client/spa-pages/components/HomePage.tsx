import { Container, VStack } from "@chakra-ui/react";
import { StickyFooter } from "components/footer/StickyFooter";
import { Banner, UserInput } from "components/home";
import styles from "components/home/hideScrollbar.module.css";
import { NAVBAR_HEIGHT } from "components/nav/NavHeader";
import { useSheetyData } from "hooks/useRecyclableItemList";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { BasePage } from "layouts/BasePage";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};
export const HomePage = ({ setPage }: Props) => {
	const [stickyHeight, setStickyHeight] = useState<number>(0);
	const [readyToSubmit, setReadyToSubmit] = useState(false);

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
					<VStack align="initial" mx={25} spacing={30}>
						<Banner />
						{isLoaded && (
							<UserInput
								scrollableContainerRef={scrollableContainerRef}
								setReadyToSubmit={setReadyToSubmit}
							/>
						)}
					</VStack>
				</Container>
				<StickyFooter ref={stickyRef} disabled={!readyToSubmit} setPage={setPage} />
			</VStack>
		</BasePage>
	);
};
