import React, { useState } from "react";
import Head from "next/head";
import {
    Heading,
    Text,
    Flex,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Divider
} from "@chakra-ui/react";

import Container from "../components/Container";
import { getAllFilesFrontMatter } from "../lib/mdx";
import BlogPost from "../components/BlogPost";

import { SearchIcon } from "@chakra-ui/icons";

export default function Blog({ posts }) {
    const [searchValue, setSearchValue] = useState("");

    const filteredBlogPosts = posts
        .sort(
            (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        )
        .filter((frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <>
            <Head>
                <title>Blog - RGW</title>
            </Head>
            <Container>
                <Stack
                    as="main"
                    spacing={8}
                    justifyContent="center"
                    alignItems="flex-start"
                    m="0 auto 4rem auto"
                >
                    <Flex
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        maxWidth="1080px"
                        px={4}
                    >
                        <Heading mb={4} as="h1" size="4xl">
                            Kopi Stories
                        </Heading>
                        <Divider />

                        <InputGroup mb={4} mr={4} w="100%">
                            <Input
                                aria-label="Search by title"
                                placeholder="Or if you want search by title also can lor..."
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputRightElement>
                                <SearchIcon color="gray.300" />
                            </InputRightElement>
                        </InputGroup>

                        <Divider />

                        <Text my={5} fontSize="lg">Uncle Sem curated {posts.length} article{posts.length == 1 ? "" : "s"} for you:</Text>
                        {!filteredBlogPosts.length && "No posts found :("}
                        {filteredBlogPosts.map((frontMatter) => <BlogPost key={frontMatter.title} {...frontMatter} />)}
                    </Flex>
                </Stack>
            </Container>
        </>
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("blog");

    return { props: { posts } };
}