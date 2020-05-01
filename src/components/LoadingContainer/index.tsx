import React from "react";

import { Container, Spinner } from "./styles";

export const LoadingContainer = () => (
  <Container>
    <Spinner>
      <div></div>
      <div></div>
    </Spinner>
  </Container>
);
