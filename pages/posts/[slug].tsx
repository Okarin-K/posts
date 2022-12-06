import type { NextPage } from "next";
import { useRouter } from "next/router";
import markdownStyles from "../../styles/Markdown.module.css";
import { convertMarkdownToHTML } from "../api/convertMarkdownToHTML";
import { getAllPosts, getPostBySlug } from "../api/getAllPosts";

type PropType = {
    title: string;
    slug: string;
    content: string;
};

export const Content: NextPage<{ post: PropType }> = ({ post }) => {
    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return <p>Error 404</p>;
    }

    return (
        <div className={markdownStyles.container}>
            <div className={markdownStyles.markdown}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </div>
    );
};

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
    const posts = await getAllPosts();

    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false, // can also be true or 'blocking'
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    const content = convertMarkdownToHTML(post.content || "");

    return {
        // Passed to the page component as props
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
}

export default Content;
