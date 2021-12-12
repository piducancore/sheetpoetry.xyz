/** @jsx jsx */
import { Grid, jsx, Box } from "theme-ui";
import { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-fetch";

import AnimatedText from "./animated-text";
import Form from "./form";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  fetch,
});

export default function Example() {
  const [{ sheetpoem }, setWords] = useState("...");
  return (
    <ApolloProvider client={client}>
      <Grid columns={[1, 2]}>
        <Box>
          <AnimatedText words={sheetpoem} />
        </Box>
        <Box>
          <Form onCompleted={setWords} />
        </Box>
      </Grid>
    </ApolloProvider>
  );
}
