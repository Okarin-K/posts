import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getAllPosts } from "./api/getAllPosts";

const Home: NextPage<{
    posts: {
        title: string;
        slug: string;
        content: string;
    }[];
}> = ({ posts }) => {
    return (
        <div className={styles.container}>
            <h1>Hello</h1>
            {posts.map((post) => (
                <div key={post.slug}>
                    <Link as={`/posts/${post.slug}`} href={{ pathname: `posts/[slug]` }}>
                        {post.title}
                    </Link>
                </div>
            ))}
        </div>
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
