import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../hooks/index.reducer";
import { Component as Post } from "./components/Post";
import { Component as PostDetails } from "./components/PostDetails";
import { Component as ManagePost } from "./components/ManagePost";
import { deselectPost } from "../../hooks/Posts/actions";
import { LoadingContainer } from "../../components/LoadingContainer";
import usePostsInfoApi from "../../hooks/Posts";

import { AddPost, Container, Grid, PostWrapper } from "./styles";

export const Component = () => {
  const [selectedPostIndex, selectPost] = useState(-1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [detailsAreShown, showDetails] = useState(false);
  const [managePostDialogIsShown, setManagePostDialog] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { state, dispatch } = useContext(MainContext);
  const { getPostsInfo } = usePostsInfoApi();

  useEffect(() => {
    getPostsInfo().then(() => setIsLoadingData(false));
  }, [getPostsInfo]);

  const { allPosts } = state?.posts;

  return (
    <Container>
      {isLoadingData && <LoadingContainer />}
      {detailsAreShown && (
        <PostDetails
          id={allPosts[selectedPostIndex]?.id || selectedPostIndex}
          handleClickOutside={() => {
            showDetails(false);
            selectPost(-1);
            dispatch(deselectPost());
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
          post={allPosts[selectedPostIndex]}
        />
      )}
      <AddPost onClick={() => setManagePostDialog(!managePostDialogIsShown)}>
        New Post
      </AddPost>
      <Grid>
        {allPosts.map((post, index) => (
          <PostWrapper
            key={`post-wrapper-${index}`}
            onClick={() => {
              selectPost(index);
              showDetails(true);
            }}
          >
            <Post
              key={`post-${index}`}
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
