import React from "react";

import { CancelButton, Container, DeleteButton, Title } from "./styles";

import { POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT } from "./index.page.test";

type Props = {
  handleCancelClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({ handleCancelClick, handleDeleteClick }: Props) => {
  return (
    <Container>
      <Title data-testid={POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT.title}>
        Do you want to delete this post?
      </Title>

      <section>
        <CancelButton
          data-testid={POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT.cancelButton}
          onClick={handleCancelClick}
        >
          Cancel
        </CancelButton>
        <DeleteButton
          data-testid={POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT.deleteButton}
          onClick={handleDeleteClick}
        >
          Accept
        </DeleteButton>
      </section>
    </Container>
  );
};
