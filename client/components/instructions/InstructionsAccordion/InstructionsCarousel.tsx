import { Box, Flex, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "components/pickup/carousel.module.css";
import { SLIDES_INTERVAL_TIME } from "components/pickup/PickupCarousel";
const InstructionsCarousel = ({ items }: { items: string[] }) => {
	return (
		<Carousel
			showThumbs={false}
			showStatus={false}
			showArrows={false}
			autoPlay
			infiniteLoop
			interval={SLIDES_INTERVAL_TIME}
			renderIndicator={(clickHandler, isSelected, index) => {
				return (
					<li
						onClick={clickHandler}
						key={index}
						role="button"
						className={isSelected ? `${styles.ind} ${styles.active}` : styles.ind}
					/>
				);
			}}
		>
			{items.map((item, idx) => {
				return (
					<Flex align="center" pb={10} key={idx}>
						<Box flexGrow={1} width={"100%"}>
							<Text textAlign={"left"}>
								<Text as="b" fontSize="lg">
									Step {idx + 1} of {items.length}
								</Text>
							</Text>

							<Text textAlign={"left"}>{item}</Text>
						</Box>
					</Flex>
				);
			})}
		</Carousel>
	);
};

export default InstructionsCarousel;
