import React from "react";

import { CancelButton, Container, DeleteButton, Title } from "./styles";

type Props = {
  handleCancelClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({ handleCancelClick, handleDeleteClick }: Props) => {
  return (
    <Container>
      <Title>Do you want to delete this post?</Title>

      <section>
        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
        <DeleteButton onClick={handleDeleteClick}>Accept</DeleteButton>
      </section>
    </Container>
  );
};
