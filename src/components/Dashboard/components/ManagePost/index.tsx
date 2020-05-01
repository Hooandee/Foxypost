import React, { useContext, useState } from "react";
import usePostsInfoApi from "../../../../hooks/Posts";
import { MainContext } from "../../../../hooks/index.reducer";
import { PostType } from "../../../../hooks/Posts/actions";

import {
  CancelButtonSmall,
  Container,
  Content,
  CloseButton,
  Fieldset,
  FieldsetVertical,
  Form,
  Footer,
  LoadingContainer,
  Title,
  SaveButton,
  Spinner,
} from "./styles";

type Props = {
  post?: PostType;
  isUpdating: boolean;
  handleClickOutside: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({ post, isUpdating, handleClickOutside }: Props) => {
  const { state } = useContext(MainContext);
  const { postNewPost, updatePost } = usePostsInfoApi();

  const [form, setForm] = useState({
    id: isUpdating ? post?.id : -1,
    title: isUpdating ? post?.title : "",
    content: isUpdating ? post?.content : "",
    lat: isUpdating ? post?.lat : "",
    long: isUpdating ? post?.long : "",
    image_url: isUpdating ? post?.image_url : "",
  });

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
        {state?.posts?.isLoading && (
          <LoadingContainer>
            <Spinner>
              <div></div>
              <div></div>
            </Spinner>
          </LoadingContainer>
        )}
        <CloseButton onClick={handleClickOutside} />
        <Title>
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
            <label htmlFor="title">Title</label>
            <input
              name="title"
              id="title"
              value={form.title}
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
              }}
            ></input>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              value={form.content}
              onChange={(event) => {
                setForm({ ...form, content: event.target.value });
              }}
            ></textarea>
            <label htmlFor="image_url">Image Url</label>
            <input
              name="image_url"
              id="image_url"
              value={form.image_url}
              onChange={(event) => {
                setForm({ ...form, image_url: event.target.value });
              }}
            ></input>
          </Fieldset>
          <FieldsetVertical>
            <div>
              <label htmlFor="lat">
                lat{" "}
                <span role="img" aria-label="globe emoji">
                  🌐
                </span>
              </label>
              <input
                name="latitude"
                id="lat"
                value={form.lat}
                onChange={(event) => {
                  setForm({ ...form, lat: event.target.value });
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="long">
                long{" "}
                <span role="img" aria-label="globe emoji">
                  🌐
                </span>
              </label>
              <input
                name="longitude"
                id="long"
                value={form.long}
                onChange={(event) => {
                  setForm({ ...form, long: event.target.value });
                }}
              ></input>
            </div>
          </FieldsetVertical>

          <Footer>
            <CancelButtonSmall onClick={handleClickOutside}>
              Cancel
            </CancelButtonSmall>
            <SaveButton
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
