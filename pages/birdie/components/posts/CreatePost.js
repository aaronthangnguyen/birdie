import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";

export const CreatePost = ({ data, onMutate }) => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const titleInputRef = useRef();

  const handleSubmit = async () => {
    const post = {
      title: title,
      username: username,
      content: content,
    };

    titleInputRef?.current.focus();
    setTitle("");
    setUsername("");
    setContent("");

    const { posts } = data;
    onMutate(
      {
        ...data,
        posts: [
          { id: "0", createDate: new Date().toJSON(), ...post },
          ...posts,
        ],
      },
      false
    );

    const response = await axios.post(
      "https://birdie.aaronthangnguyen.workers.dev/posts",
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    onMutate();
  };
  return (
    <Box bgColor="white" boxShadow="md" rounded="lg" p={4} mb={6}>
      <Flex justify="space-between" mb={2}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          flexGrow={1}
          ref={titleInputRef}
        />
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          width="10rem"
          ml={2}
        />
      </Flex>
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        mb={4}
      />
      <Button isFullWidth={1} colorScheme="teal" onClick={handleSubmit}>
        Post
      </Button>
    </Box>
  );
};
