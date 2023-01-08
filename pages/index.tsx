import { Box, Flex, Heading, HStack, Image, ListItem, Spacer, Text, UnorderedList, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { Posts } from '../types/posts';
import { getAllPosts } from './api/getAllPosts';
import { BsTwitter, BsGithub } from 'react-icons/bs';
import { FaBloggerB } from 'react-icons/fa';

const Home: NextPage<{
    posts: Posts[];
}> = ({ posts }) => {
    return (
        <Layout>
            <VStack mb="10vh">
                <VStack w="100%" h="100vh" bg="linear-gradient(to bottom right, blue, pink)">
                    <Spacer />
                    <Image borderRadius="50%" w="300px" h="300px" src="ramlethal-q.jfif" alt="profile image" />
                    <Heading>Okarin</Heading>
                    <HStack>
                        <Link href="https://twitter.com/rachel2289029" target="_blank">
                            <BsTwitter width="32px" />
                        </Link>
                        <Link href="https://github.com/Okarin-K" target="_blank">
                            <BsGithub width="32px" />
                        </Link>
                        <Link href="https://sazanamin.hatenablog.jp/" target="_blank">
                            <FaBloggerB width="32px" />
                        </Link>
                    </HStack>
                    <Spacer />
                </VStack>
                <Box>
                    <Box>
                        <h2>Articles</h2>
                        {posts.map((post) => (
                            <article key={post.slug}>
                                <Link as={`/posts/${post.slug}`} href={{ pathname: `posts/[slug]` }}>
                                    <h3>{post.title}</h3>
                                </Link>
                                <span>{post.date}</span>
                            </article>
                        ))}
                    </Box>
                </Box>
            </VStack>
        </Layout>
    );
};

export async function getStaticProps() {
    const posts = await getAllPosts();
    return {
        props: {
            posts,
        },
    };
}

export default Home;
