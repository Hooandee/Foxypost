import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../hooks/index.reducer";
import { Component as Post } from "./components/Post";
import { Component as PostDetails } from "./components/PostDetails";
import { AddPost, Container, Grid, PostWrapper } from "./styles";
import usePostsInfoApi from "../../hooks/Posts";

export const Component = () => {
  const [selectedPostIndex, selectPost] = useState(-1);
  const [detailsAreShown, showDetails] = useState(false);
  const { state } = useContext(MainContext);

  const [getPostInfo] = usePostsInfoApi();

  useEffect(() => {
    getPostInfo(0);
  }, [getPostInfo]);

  return (
    <Container>
      {detailsAreShown && (
        <PostDetails
          id={selectedPostIndex}
          handleClickOutside={() => {
            showDetails(false);
            selectPost(-1);
          }}
        />
      )}
      <AddPost>New Post</AddPost>
      <Grid>
        {state?.posts?.allPosts.map((post, index) => (
          <PostWrapper
            onClick={() => {
              selectPost(index + 1);
              showDetails(true);
            }}
          >
            <Post key={index} {...post} />
          </PostWrapper>
        ))}
      </Grid>
    </Container>
  );
};
