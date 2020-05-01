import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../hooks/index.reducer";
import { Component as Post } from "./components/Post";
import { Component as PostDetails } from "./components/PostDetails";
import { Component as ManagePost } from "./components/ManagePost";
import { AddPost, Container, Grid, PostWrapper } from "./styles";
import usePostsInfoApi from "../../hooks/Posts";

export const Component = () => {
  const [selectedPostIndex, selectPost] = useState(-1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [detailsAreShown, showDetails] = useState(false);
  const [managePostDialogIsShown, setManagePostDialog] = useState(false);

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
          id={
            state?.posts?.allPosts[selectedPostIndex]?.id || selectedPostIndex
          }
          handleClickOutside={() => {
            showDetails(false);
            selectPost(-1);
          }}
        />
      )}
      {managePostDialogIsShown && (
        <ManagePost
          isUpdating={isUpdating}
          handleClickOutside={() => {
            setManagePostDialog(false);
            setIsUpdating(false);
          }}
          post={state?.posts?.allPosts[selectedPostIndex]}
        />
      )}
      <AddPost onClick={() => setManagePostDialog(!managePostDialogIsShown)}>
        New Post
      </AddPost>
      <Grid>
        {state?.posts?.allPosts.map((post, index) => (
          <PostWrapper
            onClick={() => {
              selectPost(index);
              showDetails(true);
            }}
          >
            <Post
              key={index}
              imageUrl={post.image_url}
              title={post.title}
              onEditClickHandler={() => {
                selectPost(index);
                setManagePostDialog(true);
                setIsUpdating(true);
              }}
            />
          </PostWrapper>
        ))}
      </Grid>
    </Container>
  );
};
