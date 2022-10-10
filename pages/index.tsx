import Head from "next/head";
// Component
import Post from "../interfaces/post";
// lib
import { getAllPosts } from "../lib/api";
import Meta from "../lib/Meta";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Meta />
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <a href={`posts/${post.slug}`}>
              <div>{post.title}</div>
            </a>
            <div>{post.description}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "category", "description", "tags", "slug"]);

  return {
    props: { allPosts },
  };
};
