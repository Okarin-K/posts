import { Box, Heading, HStack, Image, ListItem, Spacer, Text, UnorderedList, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Posts } from '../types/posts';
import { getAllPosts } from './api/getAllPosts';

const Home: NextPage<{
    posts: Posts[];
}> = ({ posts }) => {
    return (
        <>
            <VStack mb="10vh">
                <HStack w="100%" h="100vh" bg="linear-gradient(to bottom right, blue, pink)">
                    <Spacer />
                    <Image borderRadius="50%" w="300px" h="300px" src="/daidai.jpeg" alt="profile image" />
                    <Box>
                        <Heading>Okarin</Heading>
                        <Text>日々の生活やプログラミングに関する情報を発信するOkarinのウェブサイトです。</Text>
                        <Text>
                            アイコンは
                            <a href="https://urasunday.com/title/1155" target="_brank">
                                裏バイト：逃亡禁止
                            </a>
                            の橙ちゃんです。
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                <Link href="https://twitter.com/rachel2289029" target="_blank">
                                    Twitter
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://github.com/Okarin-K" target="_blank">
                                    Github
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://sazanamin.hatenablog.jp/" target="_blank">
                                    Hatena blog
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Spacer />
                </HStack>
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
        </>
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
