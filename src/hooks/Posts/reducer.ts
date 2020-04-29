import { PostType, PostsActions } from "./actions";
import { Post } from "./actions";

export type State = {
  allPosts: PostType[];
  postDetails: PostType;
};

export const postReducer = (state: State, action: PostsActions) => {
  switch (action.type) {
    case Post.fetchingPostsSuccess:
      return { ...state, allPosts: action.payload };
    case Post.fetchingPosts:
      return state;
    case Post.fetchingPostsFail:
      return state;

    case Post.fetchingPostDetailsSuccess:
      return { ...state, postDetails: action.payload };

    default:
      return state;
  }
};
