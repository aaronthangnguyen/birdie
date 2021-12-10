import { Post } from "./Post";
import { Box, VStack } from "@chakra-ui/react";

export const PostList = ({ data, error }) => {
  if (error) return <div>Failed to load</div>;
  if (!data) return <Box>Loading...</Box>;

  return (
    <VStack align="stretch" spacing={3}>
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </VStack>
  );
};
