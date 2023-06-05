import { Box, Flex, Stack, HStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { COLORS } from "theme";
import { useBreakpointValue } from "@chakra-ui/react";

const PickupCarousel = () => {
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
	const [currentSlide, setCurrentSlide] = useState(0);
	const slidesCount = slides.length;
	const SLIDES_INTERVAL_TIME = 20000;
	const ANIMATION_DIRECTION = "right";
	const carouselStyle = {
		transition: "all .5s",
		ml: `-${currentSlide * 100}%`,
	};
	useEffect(() => {
		const prevSlide = () => {
			setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
		};

		const nextSlide = () => {
			setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
		};

		const automatedSlide = setInterval(() => {
			ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
		}, SLIDES_INTERVAL_TIME);
		return () => clearInterval(automatedSlide);
	}, [slidesCount]);

	return (
		<Flex w="full" pos="relative" overflow="hidden" direction={"column"}>
			<Flex h={"150px"} w={"full"} {...carouselStyle}>
				{slides.map((slide, id) => (
					<Box key={id} mx={[5, 1]} mr={[0, 2]} flex={"none"}>
						<Stack>
							<Image src={slide.url} alt="Header Banner" />
						</Stack>
					</Box>
				))}
			</Flex>
			<HStack mt={[0, 5]} justify="center">
				{Array.from({
					length: slidesCount,
				}).map((_, slide) => (
					<Box
						key={`dots-${slide}`}
						cursor="pointer"
						boxSize={["7px", null, "12px"]}
						m="0 2px"
						bg={currentSlide === slide ? COLORS.teal : COLORS.gray["300"]}
						rounded="50%"
						display="inline-block"
						transition="background-color 0.6s ease"
						_hover={{
							bg: "blackAlpha.800",
						}}
						onClick={() => setCurrentSlide(slide)}
					></Box>
				))}
			</HStack>
		</Flex>
	);
};

export default PickupCarousel;
