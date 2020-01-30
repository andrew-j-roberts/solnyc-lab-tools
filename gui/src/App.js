import React from "react";
import theme from "./theme";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import JobForm from "./forms/JobForm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <JobForm />
    </ThemeProvider>
  );
}

export default App;
