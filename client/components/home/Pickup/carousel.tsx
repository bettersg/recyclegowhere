import { Box, Flex, Text, Stack, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const PickupCarousel = () => {
    const slides = [
        {
            description: "Uncle Semakau has found ... 45 Organisations who can pick up from your location"
        },
        {
            description: "If you don't mind walking though, the nearest bin is 50m away!"
        }
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
            <Flex h={"250px"} w={"full"} {...carouselStyle}>
                {slides.map((slide, id)=>(
                    <Box key={id} boxSize={"full"} shadow={"md"} flex={"none"}>
                        <Stack>
                            <Text fontSize={"lg"} align={"center"} justifyContent={"center"}>{slide.description}</Text>
                        </Stack>
                    </Box>
                ))}
            </Flex>
            <HStack justify="center">
                {Array.from({
                    length: slidesCount,
                }).map((_, slide) => (
                <Box
                    key={`dots-${slide}`}
                    cursor="pointer"
                    boxSize={["7px", null, "15px"]}
                    m="0 2px"
                    bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
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