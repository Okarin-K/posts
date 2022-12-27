import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Posts } from '../types/posts';
import { getAllPosts } from './api/getAllPosts';

const Home: NextPage<{
    posts: Posts[];
}> = ({ posts }) => {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.profileItem}>
                    <img className={styles.profileImg} src="/daidai.jpeg"></img>
                    <div className={styles.profileBody}>
                        <h2>Okarin</h2>
                        <p>日々の生活やプログラミングに関する情報を発信するOkarinのウェブサイトです。</p>
                        <p>
                            アイコンは
                            <a href="https://urasunday.com/title/1155" target="_brank">
                                裏バイト：逃亡禁止
                            </a>
                            の橙ちゃんです。
                        </p>
                        <ul>
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
                            <li>
                                <Link href="https://sazanamin.hatenablog.jp/" target="_blank">
                                    Hatena blog
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
