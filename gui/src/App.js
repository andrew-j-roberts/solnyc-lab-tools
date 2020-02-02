import React, { useState } from "react";
import theme from "./theme";
import {
  CSSReset,
  Flex,
  Grid,
  Heading,
  PseudoBox,
  Stack,
  ThemeProvider
} from "@chakra-ui/core";
import { Jobs } from "./pages";

export default function App() {
  const [page, setPage] = useState("jobs");
  let content = getContent(page);
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Layout>{content}</Layout>
    </ThemeProvider>
  );
}

function Layout({ children }) {
  return (
    <Grid templateColumns={"250px 1fr"} height="100vh" width="100vw">
      <NavigationSidebar />
      <Flex maxHeight="100%" width="100%" justifyContent="center" p={2}>
        {children}
      </Flex>
    </Grid>
  );
}

function NavigationSidebar() {
  return (
    <Stack borderRight="1px solid #CCC" alignItems="center" p={2}>
      <Heading as="h1" size="xl">
        sdkperf_*
      </Heading>
      <PseudoBox
        _focus={{
          shadow: "outline",
          color: "gray.900",
          transform: "translateY(-2px)"
        }}
        _hover={{ color: "gray.900", transform: "translateY(-2px)" }}
        _notFirst={{ mt: 1 }}
        align="center"
        as="a"
        href=""
        color="gray.800"
        cursor="pointer"
        display="flex"
        fontWeight="medium"
        mx={-2}
        outline="none"
        px="2"
        py="1"
        transition="all 0.2s"
        fontSize="xl"
        onClick={() => console.log("tag you're it")}
      >
        Job Manager
      </PseudoBox>
      <PseudoBox
        _focus={{
          shadow: "outline",
          color: "gray.900",
          transform: "translateY(-2px)"
        }}
        _hover={{ color: "gray.900", transform: "translateY(-2px)" }}
        _notFirst={{ mt: 1 }}
        align="center"
        as="a"
        href=""
        color="gray.800"
        cursor="pointer"
        display="flex"
        fontWeight="medium"
        mx={-2}
        outline="none"
        px="2"
        py="1"
        transition="all 0.2s"
        fontSize="xl"
        onClick={() => console.log("tag you're it")}
      >
        Workers
      </PseudoBox>
      <PseudoBox
        _focus={{
          shadow: "outline",
          color: "gray.900",
          transform: "translateY(-2px)"
        }}
        _hover={{ color: "gray.900", transform: "translateY(-2px)" }}
        _notFirst={{ mt: 1 }}
        align="center"
        as="a"
        href=""
        color="gray.800"
        cursor="pointer"
        display="flex"
        fontWeight="medium"
        mx={-2}
        outline="none"
        px="2"
        py="1"
        transition="all 0.2s"
        fontSize="xl"
        onClick={() => console.log("tag you're it")}
      >
        Jobs
      </PseudoBox>
      <PseudoBox
        _focus={{
          shadow: "outline",
          color: "gray.900",
          transform: "translateY(-2px)"
        }}
        _hover={{ color: "gray.900", transform: "translateY(-2px)" }}
        _notFirst={{ mt: 1 }}
        align="center"
        as="a"
        href=""
        color="gray.800"
        cursor="pointer"
        display="flex"
        fontWeight="medium"
        mx={-2}
        outline="none"
        px="2"
        py="1"
        transition="all 0.2s"
        fontSize="xl"
        onClick={() => console.log("tag you're it")}
      >
        Job groups
      </PseudoBox>
    </Stack>
  );
}

function getContent(page) {
  switch (page) {
    case "jobs":
      return <Jobs />;
  }
}
