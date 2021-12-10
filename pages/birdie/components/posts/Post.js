import { Box, Text } from "@chakra-ui/react";

export const Post = ({ post }) => {
  const { title, username, content, createDate } = post;
  return (
    <Box bgColor="white" boxShadow="md" rounded="lg" p={4}>
      <Text fontWeight="semibold" textTransform="uppercase" mb={-1}>
        {title}
      </Text>
      <Text fontWeight="medium" fontSize="sm" color="gray.500">
        @{username} · {new Date(createDate).toLocaleString()}
      </Text>
      <Text>{content}</Text>
    </Box>
  );
};
