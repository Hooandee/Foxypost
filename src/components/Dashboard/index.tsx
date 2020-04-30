import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../hooks/index.reducer";
import { Component as Post } from "./components/Post";
import { Component as PostDetails } from "./components/PostDetails";
import { Component as ManagePost } from "./components/ManagePost";
import { AddPost, Container, Grid, PostWrapper } from "./styles";
import usePostsInfoApi from "../../hooks/Posts";

export const Component = () => {
  const [selectedPostIndex, selectPost] = useState(-1);
  const [detailsAreShown, showDetails] = useState(false);
  const [newPostDialogIsShown, showNewPostDialog] = useState(false);

  const { state } = useContext(MainContext);

  const { getPostsInfo } = usePostsInfoApi();

  useEffect(() => {
    // @ts-ignore
    getPostsInfo(0);
  }, [getPostsInfo]);

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
      {newPostDialogIsShown && (
        <ManagePost
          isUpdating={true}
          handleClickOutside={() => {
            showNewPostDialog(false);
          }}
          title="Sample"
        />
      )}
      <AddPost onClick={() => showNewPostDialog(!newPostDialogIsShown)}>
        New Post
      </AddPost>
      <Grid>
        {state?.posts?.allPosts.map((post, index) => (
          <PostWrapper
            onClick={() => {
              selectPost(index + 1);
              showDetails(true);
            }}
          >
            <Post
              key={index}
              imageUrl={post.image_url}
              onEditClickHandler={() => showNewPostDialog(true)}
            />
          </PostWrapper>
        ))}
      </Grid>
    </Container>
  );
};
