import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../hooks/index.reducer";
import { Component as Post } from "./components/Post";
import { Component as PostDetails } from "./components/PostDetails";
import { Component as ManagePost } from "./components/ManagePost";
import { deselectPost } from "../../hooks/Posts/actions";
import { LoadingContainer } from "../../components/LoadingContainer";
import usePostsInfoApi from "../../hooks/Posts";

import { AddPost, Container, Grid, PostWrapper } from "./styles";

import { DASHBOARD_PAGE_OBJECT } from "./index.page.test";

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

  const handlePostDetailsClickOutside = () => {
    showDetails(false);
    selectPost(-1);
    dispatch(deselectPost());
  };

  const handleManagePostClickOutside = () => {
    setManagePostDialog(false);
    setIsUpdating(false);
  };

  const handlePostWrapperClick = (index: number) => {
    selectPost(index);
    showDetails(true);
  };

  const handlePostClick = (index: number) => {
    selectPost(index);
    setManagePostDialog(true);
    setIsUpdating(true);
  };

  const { allPosts } = state?.posts;

  return (
    <Container>
      <>
        {isLoadingData && <LoadingContainer />}
        {detailsAreShown && (
          <PostDetails
            id={allPosts[selectedPostIndex]?.id || selectedPostIndex}
            handleClickOutside={handlePostDetailsClickOutside}
          />
        )}
        {managePostDialogIsShown && (
          <ManagePost
            isUpdating={isUpdating}
            handleClickOutside={handleManagePostClickOutside}
            post={allPosts[selectedPostIndex]}
          />
        )}
      </>
      <AddPost
        data-testid={DASHBOARD_PAGE_OBJECT.addButton}
        onClick={() => setManagePostDialog(!managePostDialogIsShown)}
      >
        New Post
      </AddPost>
      <Grid data-testid={DASHBOARD_PAGE_OBJECT.grid}>
        {allPosts.map((post, index) => (
          <PostWrapper
            data-testid={DASHBOARD_PAGE_OBJECT.postWrapper(index)}
            key={`post-wrapper-${index}`}
            onClick={() => handlePostWrapperClick(index)}
          >
            <Post
              id={index}
              imageUrl={post.image_url}
              title={post.title}
              onEditClickHandler={() => handlePostClick(index)}
            />
          </PostWrapper>
        ))}
      </Grid>
    </Container>
  );
};
