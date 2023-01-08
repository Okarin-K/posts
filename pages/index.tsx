import { Box, Heading, HStack, Image, Spacer, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { FaBloggerB } from 'react-icons/fa';
import Layout from '../components/layout';

const Home: NextPage = () => {
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
                    <Box border="solid 1px gray" p="10">
                        <Link href="/techArticles">技術記事</Link>
                    </Box>
                </Box>
            </VStack>
        </Layout>
    );
};

export default Home;
