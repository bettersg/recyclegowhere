import { Text, Button, ButtonGroup, VStack, Heading } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";

const OrgCard = () => {
    return (
    <Card direction={{ base: "column" }} variant={"elevated"}>
            <CardBody>
                <VStack spacing={"3"} mt={"6"}>
                    <Heading size={"md"} as={"b"}>
                        Organisation Name
                    </Heading>
                    <Text fontSize={"xs"}>Please visit the website for more information.</Text>
                    <Text fontSize={"s"} as={"b"}>
                        You can donate:
                        Clothing, Bags and Accessories, Books, Stationery, Drink Cans.
                    </Text>
                    <Text fontSize={"s"} as={"b"}>
                        Service Cost: $30
                        <br />
                        Min. Pickup Quantity: 40kg
                    </Text>
                    <ButtonGroup>
                        <Button colorScheme={"teal"} variant={"outline"}>
                            Website
                        </Button>
                        <Button colorScheme={"teal"} variant={"solid"}>
                            Contact
                        </Button>
                    </ButtonGroup>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default OrgCard;