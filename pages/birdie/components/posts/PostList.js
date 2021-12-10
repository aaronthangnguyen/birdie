import { Post } from "./Post";
import { Box, VStack } from "@chakra-ui/react";

export const PostList = ({ data, error }) => {
  if (error) return <div>Failed to load</div>;
  if (!data) return <Box>Loading...</Box>;

  const { posts } = data;

  return (
    <VStack align="stretch" spacing={3}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </VStack>
  );
};
