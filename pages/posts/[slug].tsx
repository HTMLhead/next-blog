import React from "react";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import Head from "next/head";

import type PostType from "../../interfaces/post";

import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../utils/markdownToHtml";
import Meta from "../../lib/Meta";

import fetcher from "../../utils/fetcher";

const Article: React.FC = () => {
  const { data } = useSWR<PostType>("/api/post", fetcher);

  return (
    <>
      <Meta />
      <Head>
        <title>
          {data.title} | {data.description}
        </title>
      </Head>
      <div>{data.description}</div>
      <div className="markdown">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </>
  );
};

export default function Post({ fallback }) {
  const router = useRouter();

  return router.isFallback ? (
    <div>loading</div>
  ) : (
    <SWRConfig value={{ fallback }}>
      <Article />
    </SWRConfig>
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
  const postInfo = { ...post, content };

  return {
    props: {
      fallback: { "/api/post": postInfo },
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
