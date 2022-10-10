import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import Meta from "../../lib/Meta";

import type PostType from "../../interfaces/post";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const router = useRouter();

  return router.isFallback ? (
    <div>loading</div>
  ) : (
    <>
      <Meta />
      <Head>
        <title>{post.title} | Head with nextjs</title>
      </Head>
      <div>{post.description}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "description", "content"]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
