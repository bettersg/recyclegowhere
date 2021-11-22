import React from 'react';
import Link from 'next/link';
import { Container, Flex, Text, Box, Button, Heading, Icon, Divider } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ArrowForwardIcon, EmailIcon } from '@chakra-ui/icons';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {

    return (
        <Box overflow="hidden" w="100vw" h="30vh" p={5}>
            <Divider marginBottom={5} />
            <Flex flexDir="row" justifyContent="space-around" marginBottom={10}>
                <Flex flexDir="column" alignItems="start">
                    <Heading as="h3" paddingBottom={2} fontSize="2xl">RecycleGoWhere</Heading>
                    <Link href="/" passHref>
                        <Button as="a" leftIcon={<ArrowForwardIcon />} colorScheme="teal" variant="link" m={1}>Home</Button>
                    </Link>
                    <Link href="/" passHref>
                        <Button as="a" leftIcon={<ArrowForwardIcon />} colorScheme="teal" variant="link" m={1}>Reuse/Recycle Items</Button>
                    </Link>
                </Flex>
                <Flex flexDir="column" alignItems="start">
                    <Heading as="h3" paddingBottom={2} fontSize="2xl">Contact Us</Heading>
                    <ChakraLink href="https://www.instagram.com/unclesemakau/" isExternal>
                        <Button leftIcon={<Icon as={FaInstagram} />} colorScheme="teal" variant="link" m={1}>@unclesemakau</Button>
                    </ChakraLink>
                    <ChakraLink href="mailto:RecycleGoWhere@better.sg" isExternal>
                        <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="link" m={1}>RecycleGoWhere@better.sg</Button>
                    </ChakraLink>
                </Flex>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" alignItems="center" paddingMargin={1}>
                <Text>A non-profit volunteer-run project by better.sg. </Text>
                <Text>Terms | Privacy</Text>
            </Flex>
        </Box>
    );
}

export default Footer;