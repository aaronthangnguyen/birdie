import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "IBM Plex Serif",
    body: "IBM Plex Sans",
  },
  styles: {
    global: {
      body: {
        bgGradient: "linear-gradient(to-r, teal.500, green.500)",
      },
    },
  },
});

export default theme;
