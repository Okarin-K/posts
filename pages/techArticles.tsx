import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Layout from '../components/layout';
import { Posts } from '../types/posts';
import { getAllPosts } from './api/getAllPosts';

export default function TechArticles({ posts }: { posts: Posts[] }) {
    return (
        <Layout>
            <VStack>
                <Box>
                    <h2>Tech Articles</h2>
                    {posts.map((post) => (
                        <article key={post.slug}>
                            <Link as={`/posts/${post.slug}`} href={{ pathname: `posts/[slug]` }}>
                                <h3>{post.title}</h3>
                            </Link>
                            <span>{post.date}</span>
                        </article>
                    ))}
                </Box>
            </VStack>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = await getAllPosts();
    return {
        props: {
            posts,
        },
    };
}
