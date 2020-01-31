import React from "react";
import theme from "./theme";
import { Box, CSSReset, Flex, Heading, Grid, PseudoBox, Stack, ThemeProvider } from "@chakra-ui/core";
import JobForm from "./forms/JobForm";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Layout>
        <JobForm />
      </Layout>
    </ThemeProvider>
  );
}

function Layout({ children }) {
  return (
    <Grid templateColumns={"250px 1fr"} height="100vh" width="100vw">
      <Stack borderRight="1px solid #CCC" alignItems="center">
        <Heading as="h1" size="xl">
          sdkperf_*
        </Heading>
        <PseudoBox
          _focus={{ shadow: "outline", color: "gray.900", transform: "translateY(-2px)" }}
          _hover={{ color: "gray.900", transform: "translateY(-2px)" }}
          _notFirst={{ mt: 1 }}
          align="center"
          as="a"
          color="gray.700"
          cursor="pointer"
          display="flex"
          fontWeight="medium"
          href="/jobs"
          mx={-2}
          outline="none"
          px="2"
          py="1"
          transition="all 0.2s"
          fontSize="xl"
        >
          Jobs
        </PseudoBox>
      </Stack>
      <Stack>
        <Box>BACK BUTTON</Box>
        <Box ml="auto" mr="auto">
          <Box minWidth="1000px" width="1000px" area="content">
            {children}
          </Box>
        </Box>
      </Stack>
    </Grid>
  );
}
