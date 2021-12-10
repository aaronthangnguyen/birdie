import { Container, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { CreatePost } from "../components/posts/CreatePost";
import { PostList } from "../components/posts/PostList";
import useSWR from "swr";
import axios from "axios";

// import Post from "../components/post";

// export async function getStaticProps() {
//   // fetch list of posts
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_page=1"
//   );
//   const postList = await response.json();
//   return {
//     props: {
//       postList,
//     },
//   };
// }
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function IndexPage() {
  const { data, error, mutate } = useSWR(
    "https://birdie.aaronthangnguyen.workers.dev/posts",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { posts } = data;

  posts.sort((first, second) => {
    const firstTime = new Date(first.createDate);
    const secondTime = new Date(second.createDate);
    return secondTime.getTime() - firstTime.getTime();
  });

  return (
    <main>
      <Head>
        <title>Birdie</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading size="2xl" fontFamily="Pacifico" m={4} color="gray.900">
          Birdie 🕊
        </Heading>
        <CreatePost data={data} onMutate={mutate} />
        <PostList data={data} error={error} />
      </Container>
    </main>
  );
}
