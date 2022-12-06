import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Posts } from "../types/posts";
import { getAllPosts } from "./api/getAllPosts";

const Home: NextPage<{
    posts: Posts[];
}> = ({ posts }) => {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.profileItem}>
                    <img className={styles.profileImg} src="/ginko_2.jpg"></img>
                    <div className={styles.profileBody}>
                        <h1>Okarin</h1>
                        <p>Webエンジニアです。バックエンドが得意ですが、フロントもインフラも勉強中で大好きです。</p>
                        <p>ゲームが好きです。GGST, シャドバ、ポケモンSV...</p>
                        <p>アニメが好きです。SPYxFAMILY, ヒロアカ, リコリコ...</p>
                        <Link href="https://twitter.com/rachel2289029" target="_blank">
                            Twitter
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.articles}>
                <h2>Tech Articles</h2>
                {posts.map((post) => (
                    <article className={styles.articleItem} key={post.slug}>
                        <Link as={`/posts/${post.slug}`} href={{ pathname: `posts/[slug]` }}>
                            <h3>{post.title}</h3>
                        </Link>
                        <span className={styles.articleDate}>{post.date}</span>
                    </article>
                ))}
            </div>
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
