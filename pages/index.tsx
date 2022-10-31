import { List, ListItem } from "@chakra-ui/react";
// Component
import Post from "../interfaces/post";
// lib
import { getAllPosts } from "../lib/api";
import Meta from "../lib/Meta";
import Header from "components/Header";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Meta />
      <Header />
      <List>
        {allPosts.map((post) => (
          <ListItem color="gray.400" key={post.slug}>
            <a href={`posts/${post.slug}`}>
              <div>{post.title}</div>
            </a>
            <div>{post.description}</div>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "category", "description", "tags", "slug"]);

  return {
    props: { allPosts },
  };
};
