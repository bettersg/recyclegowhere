import { Button, Flex, Heading, Spacer, Box, ButtonGroup } from "@chakra-ui/react";

const ButtonRow = () => {
    return (
        <Flex minWidth={"max-content"} alignItems={"left"} gap={"2"}>
            <Box p="2">
                <Heading size={"md"}>Your Items:</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap={"2"}>
                <Button colorScheme={"teal"} size={"lg"}>
                    Restart!
                </Button>
                <Button colorScheme={"teal"} size={"lg"}>
                    Map
                </Button>
            </ButtonGroup>
        </Flex>
    );
};

export default ButtonRow;