import { Box, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "components/pickup/carousel.module.css";
import { Image } from "@chakra-ui/react";
const SLIDES_INTERVAL_TIME = 5000;

const PickupCarousel = ({ minDist }: { minDist: number }) => {
	// TODO: Issue #131 - Calculate number of organisations and distance to nearest blue bin and display them

	const slides = [
		{
			url: useBreakpointValue({
				base: "/headerBanner1mobile.png",
				md: "/headerBanner1desktop.png",
			}),
			number: 20,
		},
		{
			url: useBreakpointValue({
				base: "/headerBanner2mobile.png",
				md: "/headerBanner2desktop.png",
			}),
			distance: "20m",
		},
	];

	return (
		<Box className={styles.carouselbox} px={4} h={40}>
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
				{slides.map((slide, index) => (
					<div key={index} style={{ position: "relative" }}>
						<Image src={slide.url} alt={slide.url} />
						<div
							style={{
								position: "absolute",
								bottom: index === 0 ? "1%" : "46%", // Adjust the positioning as needed
								left: index === 0 ? "1%" : "22.5%", // Adjust the positioning as needed
								color: "black",
							}}
						>
							{index === 0 ? (
								<Text>Test</Text>
							) : (
								<Text> {(minDist * 1000).toFixed(0)}m</Text>
							)}{" "}
							{/* Display slide number */}
						</div>
					</div>
				))}
			</Carousel>
		</Box>
	);
};

export default PickupCarousel;
