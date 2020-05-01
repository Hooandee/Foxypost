import React, { useContext, useState } from "react";

import usePostsInfoApi from "../../../../hooks/Posts";
import { MainContext } from "../../../../hooks/index.reducer";
import { PostType } from "../../../../hooks/Posts/actions";

import { LoadingContainer } from "../../../../components/LoadingContainer";
import {
  CancelButtonSmall,
  Container,
  Content,
  CloseButton,
  Fieldset,
  FieldsetVertical,
  Form,
  Footer,
  Title,
  SaveButton,
} from "./styles";

import { MANAGE_POST_PAGE_OBJECT } from "./index.page.test";

type Props = {
  post?: PostType;
  isUpdating: boolean;
  handleClickOutside: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({
  post,
  isUpdating = false,
  handleClickOutside,
}: Props) => {
  const [form, setForm] = useState({
    id: isUpdating ? post?.id : -1,
    title: isUpdating ? post?.title : "",
    content: isUpdating ? post?.content : "",
    lat: isUpdating ? post?.lat : "",
    long: isUpdating ? post?.long : "",
    image_url: isUpdating ? post?.image_url : "",
  });

  const { state } = useContext(MainContext);
  const { postNewPost, updatePost } = usePostsInfoApi();

  const handleSubmit = () => {
    isUpdating
      ? updatePost(
          form.id || -1,
          form.title || "",
          form.content || "",
          form.lat || "",
          form.long || "",
          form.image_url || ""
        ).then(() => handleClickOutside())
      : postNewPost(
          // @ts-ignore
          form.title,
          form.content,
          form.lat,
          form.long,
          form.image_url
        ).then(() => handleClickOutside());
  };

  return (
    <Container>
      <Content>
        {state?.posts?.isLoading && <LoadingContainer />}
        <CloseButton onClick={handleClickOutside} />
        <Title data-testid={MANAGE_POST_PAGE_OBJECT.title}>
          {isUpdating ? "Modify the post" : "Add a new post"}{" "}
          <span role="img" aria-label="newspaper emoji">
            📰
          </span>
        </Title>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Fieldset>
            <label htmlFor={MANAGE_POST_PAGE_OBJECT.titleInput}>Title</label>
            <input
              name={MANAGE_POST_PAGE_OBJECT.titleInput}
              id={MANAGE_POST_PAGE_OBJECT.titleInput}
              value={form.title}
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
              }}
            ></input>
            <label htmlFor={MANAGE_POST_PAGE_OBJECT.contentInput}>
              Content
            </label>
            <textarea
              name={MANAGE_POST_PAGE_OBJECT.contentInput}
              id={MANAGE_POST_PAGE_OBJECT.contentInput}
              value={form.content}
              onChange={(event) => {
                setForm({ ...form, content: event.target.value });
              }}
            ></textarea>
            <label htmlFor={MANAGE_POST_PAGE_OBJECT.imageUrlInput}>
              Image Url
            </label>
            <input
              name={MANAGE_POST_PAGE_OBJECT.imageUrlInput}
              id={MANAGE_POST_PAGE_OBJECT.imageUrlInput}
              value={form.image_url}
              onChange={(event) => {
                setForm({ ...form, image_url: event.target.value });
              }}
            ></input>
          </Fieldset>
          <FieldsetVertical>
            <div>
              <label htmlFor={MANAGE_POST_PAGE_OBJECT.latInput}>
                lat{" "}
                <span role="img" aria-label="globe emoji">
                  🌐
                </span>
              </label>
              <input
                name={MANAGE_POST_PAGE_OBJECT.latInput}
                id={MANAGE_POST_PAGE_OBJECT.latInput}
                value={form.lat}
                onChange={(event) => {
                  setForm({ ...form, lat: event.target.value });
                }}
              ></input>
            </div>
            <div>
              <label htmlFor={MANAGE_POST_PAGE_OBJECT.longInput}>
                long{" "}
                <span role="img" aria-label="globe emoji">
                  🌐
                </span>
              </label>
              <input
                name={MANAGE_POST_PAGE_OBJECT.longInput}
                id={MANAGE_POST_PAGE_OBJECT.longInput}
                value={form.long}
                onChange={(event) => {
                  setForm({ ...form, long: event.target.value });
                }}
              ></input>
            </div>
          </FieldsetVertical>

          <Footer>
            <CancelButtonSmall
              data-testid={MANAGE_POST_PAGE_OBJECT.cancelButton}
              onClick={handleClickOutside}
            >
              Cancel
            </CancelButtonSmall>
            <SaveButton
              data-testid={MANAGE_POST_PAGE_OBJECT.acceptButton}
              disabled={
                (form.title?.length || 0) <= 0 ||
                (form.content?.length || 0) <= 0
              }
              onClick={() => {
                handleSubmit();
              }}
            >
              {isUpdating ? "Update" : "Save"}
            </SaveButton>
          </Footer>
        </Form>
      </Content>
    </Container>
  );
};
