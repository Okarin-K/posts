import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "posts");

async function getPostSlugs() {
    return await fs.readdir(POSTS_DIR, "utf8");
}

export async function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.md/, "");
    const filePath = path.join(POSTS_DIR, `${realSlug}.md`);

    const contents = await fs.readFile(filePath, "utf8");

    const { data, content } = matter(contents);

    return {
        title: data["title"],
        slug: data["slug"].replace(/.md$/, ""),
        date: data["date"],
        content: content,
    };
}

export async function getAllPosts() {
    const slugs = await getPostSlugs();

    const posts = Promise.all(
        slugs.map(async (slug) => {
            return await getPostBySlug(slug);
        })
    );

    return posts;
}
