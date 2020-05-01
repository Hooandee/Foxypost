import React, { createContext, useReducer } from "react";

import { PostsActions } from "./Posts/actions";
import { postReducer, State as ReducerState } from "./Posts/reducer";

type InitialStateType = {
  posts: ReducerState;
};

export const initialState: InitialStateType = {
  posts: {
    allPosts: [],
    postDetails: {
      id: -1,
      title: "",
      content: "",
      image_url: "",
      lat: "",
      long: "",
      updated_at: "",
    },
    isLoading: false,
  },
};

// Adding functionality for many state domains.
export const reducer = ({ posts }: InitialStateType, action: PostsActions) => ({
  posts: postReducer(posts, action),
});

export const MainContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<PostsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const MainProvider: React.FC = ({ children }) => {

  // Provides a FLUX architecture by using the new Context and Reducer hooks.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};
