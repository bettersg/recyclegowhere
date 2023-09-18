import { Box, Text } from "@chakra-ui/react";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "components/pickup/carousel.module.css";
import { Image } from "@chakra-ui/react";
import * as csstype from "csstype";

const SLIDES_INTERVAL_TIME = 5000;

const PickupCarousel = ({ minDist, numPickupServices }: { minDist: number, numPickupServices: number }) => {
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
	const getPosition = (isMobile: boolean, slideIndex: number) => {
		let bottom = "";
		let left = "";
		// If first slide
		if (slideIndex == 0) {
			if (isMobile) {
				bottom = "46%";
				left = "56%";
			} else {
				bottom = "48%";
				left = "71%";
			}
			// If second slide
		} else {
			if (isMobile) {
				bottom = "53%";
				left = "30.5%";
			} else {
				bottom = "48.5%";
				left = "21%";
			}
		}
		return {
			position: "absolute",
			left: left,
			bottom: bottom,
			color: "black",
		} as {
			position: csstype.Property.Position;
			left: string;
			bottom: string;
			color: string;
		};
	};

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
					<Box key={index} minWidth={"100%"} style={{ position: "relative" }}>
						<Image src={slide.url} alt={slide.url} />
						<div style={getPosition(isMobile, index)}>
							<Box w="70px" alignContent={"center"}>
								{" "}
								{index === 0 ? (
									<Text fontSize={["13px", "13px", "20px"]} as={"b"}>
										{numPickupServices}
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
