import { useCallback, useContext } from "react";

import { MainContext } from "../index.reducer";
import {
  errorFetchingPostsInfo,
  fetchingPostsInfo,
  successFetchingPostsInfo,
  fetchingPostDetails,
  successFetchingPostDetails,
  errorFetchingPostDetails,
  postingNewPost,
  postingNewPostSuccess,
  postingNewPostFail,
  deletingPost,
  deletingPostSuccess,
  deletingPostFail,
  updatingPost,
  updatingPostSuccess,
  updatingPostFail,
} from "./actions";

const usePostsInfoApi = () => {
  const { dispatch } = useContext(MainContext);

  const getPostsInfo = useCallback(async () => {
    dispatch(fetchingPostsInfo());
    try {
      const response = await fetch(
        "https://wf-challenge-qpowg4766h.herokuapp.com/api/v1/posts"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });

      dispatch(successFetchingPostsInfo(response));
    } catch (e) {
      dispatch(errorFetchingPostsInfo(e));
    }
  }, [dispatch]);

  const getPostDetails = useCallback(
    async (id: number) => {
      dispatch(fetchingPostDetails());
      try {
        const response = await fetch(
          `https://wf-challenge-qpowg4766h.herokuapp.com/api/v1/posts/${id}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });

        dispatch(successFetchingPostDetails(response));
      } catch (e) {
        dispatch(errorFetchingPostDetails(e));
      }
    },
    [dispatch]
  );

  const postNewPost = useCallback(
    async (
      title: string,
      content: string,
      latitude?: string,
      longitude?: string,
      image_url?: string
    ) => {
      dispatch(postingNewPost());
      try {
        const response = await fetch(
          `https://wf-challenge-qpowg4766h.herokuapp.com/api/v1/posts`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              content,
              lat: latitude,
              long: longitude,
              image_url,
            }),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });

        dispatch(postingNewPostSuccess(response));

        await getPostsInfo();
      } catch (e) {
        dispatch(postingNewPostFail(e));
      }
    },
    [getPostsInfo, dispatch]
  );

  const deletePost = useCallback(
    async (id: number) => {
      dispatch(deletingPost());
      try {
        await fetch(
          `https://wf-challenge-qpowg4766h.herokuapp.com/api/v1/posts/${id}`,
          { method: "DELETE" }
        );
        dispatch(deletingPostSuccess());
        await getPostsInfo();
      } catch (e) {
        dispatch(deletingPostFail(e));
      }
    },
    [getPostsInfo, dispatch]
  );

  const updatePost = useCallback(
    async (
      id: number,
      title: string,
      content: string,
      latitude: string,
      longitude: string,
      image_url: string
    ) => {
      dispatch(updatingPost());
      try {
        await fetch(
          `https://wf-challenge-qpowg4766h.herokuapp.com/api/v1/posts/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              content,
              lat: latitude,
              long: longitude,
              image_url,
            }),
          }
        );

        dispatch(updatingPostSuccess());
        await getPostsInfo();
      } catch (e) {
        dispatch(updatingPostFail(e));
      }
    },
    [getPostsInfo, dispatch]
  );

  return { getPostsInfo, getPostDetails, postNewPost, deletePost, updatePost };
};

export default usePostsInfoApi;
