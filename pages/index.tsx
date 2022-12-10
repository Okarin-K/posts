import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Posts } from "../types/posts";
import { getAllPosts } from "./api/getAllPosts";
import { getHatenaArticles } from "./api/getHatenaArticles";

const Home: NextPage<{
    posts: Posts[];
    hatenaArticles: {
        title: string;
        published: string;
        link: string;
    }[];
}> = ({ posts, hatenaArticles }) => {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.profileItem}>
                    <img className={styles.profileImg} src="/ginko_2.jpg"></img>
                    <div className={styles.profileBody}>
                        <ul>
                            <h2>Okarin</h2>
                            <li>
                                <h3>Webエンジニア, バックエンドメインです</h3>
                            </li>
                            <li>TypeScriptがお気に入り</li>
                            <li>アニメやゲームが好きです</li>
                            <li>
                                <Link href="https://twitter.com/rachel2289029" target="_blank">
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link href="https://github.com/Okarin-K" target="_blank">
                                    Github
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.articles}>
                <div className={styles.articleItem}>
                    <h2>Articles</h2>
                    {posts.map((post) => (
                        <article key={post.slug}>
                            <Link as={`/posts/${post.slug}`} href={{ pathname: `posts/[slug]` }}>
                                <h3>{post.title}</h3>
                            </Link>
                            <span className={styles.articleDate}>{post.date}</span>
                        </article>
                    ))}
                </div>
                <div className={styles.articleItem}>
                    <h2>Hatena Articles</h2>
                    {hatenaArticles.map((hatenaArticle) => (
                        <article key={hatenaArticle.title}>
                            <Link href={hatenaArticle.link}>
                                <h3>{hatenaArticle.title}</h3>
                            </Link>
                            <span className={styles.articleDate}>{hatenaArticle.published}</span>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const posts = await getAllPosts();
    const hatenaArticles = await getHatenaArticles();
    return {
        props: {
            posts,
            hatenaArticles,
        },
    };
}

export default Home;
