import { Box, Text } from "@chakra-ui/react";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
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
				sm: "/headerBanner1desktop.png",
			}),
		},
		{
			url: useBreakpointValue({
				base: "/headerBanner2mobile.png",
				sm: "/headerBanner2desktop.png",
			}),
		},
	];
	const [isMobile] = useMediaQuery("(max-width: 30em)");

	return (
		<Box className={styles.carouselbox} px={4} h={40}>
			<Carousel
				showThumbs={false}
				showStatus={false}
				showArrows={false}
				// autoPlay
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
					<Box key={index} minWidth={"100%"} style={{ position: "relative" }}>
						<Image src={slide.url} alt={slide.url} />
						<div
							style={{
								position: "absolute",
								bottom: isMobile
									? index === 0
										? "46%"
										: "53%"
									: index === 0
									? "48%"
									: "48.5%", // Adjust the positioning as needed
								left: isMobile
									? index === 0
										? "56%"
										: "30.5%"
									: index === 0
									? "71%"
									: "21%", // Adjust the positioning as needed
								color: "black",
							}}
						>
							<Box w="70px" alignContent={"center"}>
								{" "}
								{index === 0 ? (
									<Text fontSize={["13px", "13px", "20px"]} as={"b"}>
										TEST
									</Text>
								) : (
									<Text fontSize={["13px", "13px", "20px"]} as={"b"}>
										{(minDist * 1000).toFixed(0)}m
									</Text>
								)}{" "}
							</Box>
							{/* Display slide number */}
						</div>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default PickupCarousel;
