import React, { useContext, useState } from "react";
import usePostsInfoApi from "../../../../hooks/Posts";
import { MainContext } from "../../../../hooks/index.reducer";

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
  title?: string;
  content?: string;
  latitude?: string;
  longitude?: string;
  image_url?: string;
  isUpdating: boolean;
  handleClickOutside: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({
  title = "",
  content,
  latitude,
  longitude,
  image_url,
  isUpdating,
  handleClickOutside,
}: Props) => {
  const { state } = useContext(MainContext);
  const { postNewPost } = usePostsInfoApi();

  console.log(state);

  const [form, setForm] = useState({
    title: isUpdating ? title : "",
    content: "",
    latitude: "",
    longitude: "",
    image_url: "",
  });

  const handleSubmit = () => {
    postNewPost(
      // @ts-ignore
      form.title,
      form.content,
      form.latitude,
      form.longitude,
      form.image_url
    );
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
          Add a new post{" "}
          <span role="img" aria-label="newspaper emoji">
            📰
          </span>
        </Title>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
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
              <label htmlFor="latitude">
                Latitude{" "}
                <span role="img" aria-label="globe emoji">
                  🌐
                </span>
              </label>
              <input
                name="latitude"
                id="latitude"
                value={form.latitude}
                onChange={(event) => {
                  setForm({ ...form, latitude: event.target.value });
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="longitude">
                Longitude{" "}
                <span role="img" aria-label="globe emoji">
                  🌐
                </span>
              </label>
              <input
                name="longitude"
                id="longitude"
                value={form.longitude}
                onChange={(event) => {
                  setForm({ ...form, longitude: event.target.value });
                }}
              ></input>
            </div>
          </FieldsetVertical>

          <Footer>
            <CancelButtonSmall onClick={handleClickOutside}>
              Cancel
            </CancelButtonSmall>
            <SaveButton
              disabled={form.title.length <= 0 || form.content.length <= 0}
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </SaveButton>
          </Footer>
        </Form>
      </Content>
    </Container>
  );
};
