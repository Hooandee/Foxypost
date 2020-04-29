import { useCallback, useContext } from "react";

import { MainContext } from "../index.reducer";

import {
  errorFetchingPostsInfo,
  fetchingPostsInfo,
  successFetchingPostsInfo,
  fetchingPostDetails,
  successFetchingPostDetails,
  errorFetchingPostDetails,
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

  return [getPostsInfo, getPostDetails];
};

export default usePostsInfoApi;
